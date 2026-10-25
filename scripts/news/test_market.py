import datetime as dt
import unittest
from market import snapshot

class SnapshotTest(unittest.TestCase):
    def test_weekend_cutoff_ignores_future_and_uses_previous_close(self):
        rows = [{'date':'2026-10-22','close':100}, {'date':'2026-10-23','close':102}, {'date':'2026-10-26','close':999}]
        result = snapshot(rows, 'x', 'Index', dt.date(2026,10,24), 'fixture')
        self.assertEqual(result['tradeDate'], '2026-10-23')
        self.assertAlmostEqual(result['changePercent'], 2)
    def test_invalid_and_stale_data_rejected(self):
        with self.assertRaises(ValueError):
            snapshot([{'date':'2026-10-22','close':float('nan')}], 'x', 'Index', dt.date(2026,10,24), 'fixture')
        with self.assertRaises(ValueError):
            snapshot([{'date':'2026-01-01','close':100},{'date':'2026-01-02','close':101}], 'x', 'Index', dt.date(2026,10,24), 'fixture')

if __name__ == '__main__':
    unittest.main()
