"""Fetch a small daily index snapshot through AKShare, with provider fallback."""
import argparse
import contextlib
import datetime as dt
import json
import math
import sys
import socket

socket.setdefaulttimeout(20)


def snapshot(rows, code, name, cutoff, provider):
    valid = []
    for row in rows:
        day = str(row.get('date', ''))[:10]
        try:
            day = dt.date.fromisoformat(day)
            close = float(row['close'])
        except (ValueError, TypeError, KeyError):
            continue
        if day <= cutoff and math.isfinite(close) and close > 0:
            valid.append((day, close))
    valid = sorted(dict(valid).items())
    if len(valid) < 2:
        raise ValueError('Need two verified daily closes')
    (previous_day, previous), (day, close) = valid[-2:]
    if (cutoff - day).days > 16:
        raise ValueError('Source data is stale')
    return {'code': code, 'name': name, 'close': close,
            'changePercent': round((close / previous - 1) * 100, 4),
            'tradeDate': day.isoformat(), 'previousTradeDate': previous_day.isoformat(),
            'provider': provider}


def collect(cutoff):
    import akshare as ak
    import requests
    # AKShare does not expose timeouts on every index endpoint.
    original = requests.sessions.Session.request
    def bounded(self, *args, **kwargs):
        kwargs.setdefault('timeout', 20)
        return original(self, *args, **kwargs)
    requests.sessions.Session.request = bounded
    start = (cutoff - dt.timedelta(days=45)).strftime('%Y%m%d')
    end = cutoff.strftime('%Y%m%d')
    indices, failed = [], []
    for symbol, code, name in [('sh000001', '000001.SH', '上证指数'),
                               ('sz399001', '399001.SZ', '深证成指'),
                               ('sz399006', '399006.SZ', '创业板指')]:
        providers = [
            ('东方财富 / AKShare', lambda: ak.stock_zh_index_daily_em(symbol=symbol, start_date=start, end_date=end)),
            ('腾讯财经 / AKShare', lambda: ak.stock_zh_index_daily_tx(symbol=symbol, start_date=start, end_date=end)),
            ('新浪财经 / AKShare', lambda: ak.stock_zh_index_daily(symbol=symbol)),
        ]
        for provider, fetch in providers:
            try:
                with contextlib.redirect_stdout(sys.stderr):
                    frame = fetch()
                indices.append(snapshot(frame.to_dict('records'), code, name, cutoff, provider))
                print(f'{code}: {provider} OK', file=sys.stderr)
                break
            except Exception as error:
                print(f'{code}: {provider} unavailable ({type(error).__name__})', file=sys.stderr)
        else:
            failed.append(name)
    return {'status': 'ok' if len(indices) == 3 else 'partial' if indices else 'failed',
            'provider': 'AKShare（公开日线数据）', 'indices': indices,
            'tradeDate': max((i['tradeDate'] for i in indices), default=None),
            'message': '最近可用交易日收盘快照；涨跌幅按同一来源相邻交易日收盘价计算，非实时行情。' if indices else '免费行情来源本次不可用，未展示未经验证的数据。',
            'warnings': [f'{name} 本次获取失败' for name in failed]}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', required=True, help='Morning report date, Asia/Shanghai')
    args = parser.parse_args()
    cutoff = dt.date.fromisoformat(args.date) - dt.timedelta(days=1)
    result = collect(cutoff)
    print(json.dumps(result, ensure_ascii=False, allow_nan=False))
