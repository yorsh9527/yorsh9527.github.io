export const meta = {
  name: 'daily-news',
  description: 'Generate the daily Chinese news briefing page, update index.html, push to git, and send Feishu notification.',
  phases: [
    { title: 'Research', detail: 'Search news across 6 sectors in parallel' },
    { title: 'Generate', detail: 'Write daily HTML page and update index.html' },
    { title: 'Ship', detail: 'Git push and Feishu notification' },
  ],
}

// Daily News Briefing Workflow
// Covers: AI, International, Energy, Compute+Energy, A-shares, Other
// The page filename = generation date, covers previous day's news.

const TODAY = args?.date || new Date().toISOString().slice(0, 10) // YYYY-MM-DD

// Calculate coverage date (previous day)
const genDate = new Date(TODAY)
const covDate = new Date(genDate)
covDate.setDate(covDate.getDate() - 1)

const covStr = covDate.toISOString().slice(0, 10)
const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const covWeekday = weekdays[covDate.getDay()]
const genWeekday = weekdays[genDate.getDay()]

const genDisplay = `${genDate.getFullYear()} 年 ${genDate.getMonth() + 1} 月 ${genDate.getDate()} 日（${genWeekday}）`
const covDisplay = `${covDate.getFullYear()}年${covDate.getMonth() + 1}月${covDate.getDate()}日（${covWeekday}）`

log(`📅 生成日期：${TODAY}（${genWeekday}）覆盖日期：${covStr}（${covWeekday}）`)

// ── Phase 1: Research ──────────────────────────────────────────
phase('Research')

const SEARCH_SECTORS = [
  {
    key: 'ai',
    query: `AI人工智能 2026年${covDate.getMonth()+1}月${covDate.getDate()}日 重大新闻`,
    label: 'AI',
  },
  {
    key: 'world',
    query: `国际新闻 2026年${covDate.getMonth()+1}月${covDate.getDate()}日 美伊 中东 俄乌`,
    label: '国际',
  },
  {
    key: 'energy',
    query: `电力能源 用电负荷 2026年${covDate.getMonth()+1}月${covDate.getDate()}日 电网`,
    label: '电力能源',
  },
  {
    key: 'compute',
    query: `算电协同 AI算力 电网 2026年${covDate.getMonth()+1}月${covDate.getDate()}日`,
    label: '算电协同',
  },
  {
    key: 'ashare',
    query: `A股 中国股市 2026年${covDate.getMonth()+1}月${covDate.getDate()}日 行情 收盘`,
    label: 'A股',
  },
  {
    key: 'other',
    query: `台风 天气 暴雨 2026年${covDate.getMonth()+1}月${covDate.getDate()}日`,
    label: '其他',
  },
]

const searchResults = await pipeline(
  SEARCH_SECTORS,
  sector => agent(
    `Web search: "${sector.query}". Return a structured JSON summary with:
- top 3-5 news items for this sector
- each item: title (Chinese), brief description, source URL, source name
- key highlights (2-3 bullet points)
Focus on ${covStr} (the coverage date). Only include events from this date.`,
    { label: `search:${sector.key}`, phase: 'Research', schema: RESEARCH_SCHEMA }
  )
)

// Parse and deduplicate
const allFindings = searchResults.filter(Boolean).map(r => {
  try { return typeof r === 'string' ? JSON.parse(r) : r }
  catch { return { sector: 'unknown', items: [] } }
})

log(`✅ Research complete: ${allFindings.length} sectors covered`)

// ── Phase 2: Generate HTML ─────────────────────────────────────
phase('Generate')

const pageResult = await agent(
  `You are generating a daily Chinese news briefing HTML page. Follow these instructions exactly:

## Context
- Generation date (filename): ${TODAY}
- Coverage date: ${covStr} (${covWeekday})
- Display on site: ${genDisplay}
- Template reference: daily-pages/2026-07-14.html (MUST match its CSS and HTML structure precisely)

## Research Data
Here are the search results for 6 sectors:
${JSON.stringify(allFindings, null, 2)}

## Steps (do ALL of them)

### Step 1: Create daily-pages/${TODAY}.html
- Copy the EXACT CSS/style block from 2026-07-14.html (no changes)
- Copy the EXACT HTML page structure (hero, nav, main, grid, sections, sidebar, footer)
- Hero: "覆盖：${covDisplay}" and "生成：${TODAY} 07:30"
- 6 highlights in the <ol> panel (one per sector, most important news)
- 6 sections (#ai, #world, #energy, #compute, #ashare, #other)
- Each section: 3-5 articles with tag, h3, p, source links
- Section subtitles should be engaging small-text summaries
- Sidebar: reading notes + risk disclaimer relevant to the day's news
- ALL source links must be real URLs from the research data
- Write the file with the Write tool

### Step 2: Update index.html
- Read the current index.html
- Replace the latest card (".latest-card" section) with today's info:
  - Badge: 最新
  - h2: "${genDisplay}"
  - p.desc: a concise Chinese summary covering all 6 sectors in one sentence (~80-120 chars)
  - Link: href="daily-pages/${TODAY}.html", display "${TODAY}"
- Add the PREVIOUS latest entry to the history list as the first <li>
  - Format: <a href="daily-pages/<prev-date>.html"><span><date> <span class="date-label"><weekday></span></span><span class="arrow">阅读 →</span></a>
  - (read the current latest card to know which date was previously featured)

### Step 3: Prepare Feishu notification JSON
Write a tmp_feishu.json file with this exact structure:
{"msg_type":"text","content":{"text":"📰 每日新闻日报 · ${genDisplay}\\n\\n覆盖：${covDisplay}\\n\\n━━ 今日要点 ━━\\n\\n[6 key highlights with emoji prefixes, one per line]\\n\\n阅读全文：https://yorsh9527.github.io/daily-pages/${TODAY}.html"}}

CRITICAL RULES:
- Match 2026-07-14.html CSS and structure EXACTLY (no deviations in style tags, class names, or layout)
- All Chinese text, no English except proper nouns
- Every article must have a real source URL from the research data
- The Write tool handles encoding — just write normally
`,
  { label: 'generate-html', phase: 'Generate' }
)

log('✅ Page and index generated')

// ── Phase 3: Ship ─────────────────────────────────────────────
phase('Ship')

const shipResult = await agent(
  `Execute the following steps in order using Bash:

1. cd /c/Users/yorsh/Desktop/workplace/yorsh9527.github.io
2. git add daily-pages/${TODAY}.html index.html tmp_feishu.json
3. git commit -m "Add ${TODAY} daily news briefing" (with Co-Authored-By: Claude)
4. git push origin master
5. git push origin master:main
6. curl -s -X POST 'https://open.feishu.cn/open-apis/bot/v2/hook/fe8a09a7-114d-481b-98ae-a8b1cdca3cce' -H 'Content-Type: application/json; charset=utf-8' --data-binary @tmp_feishu.json
7. rm tmp_feishu.json

Report success or failure for each step. The feishu webhook should return "code":0 on success.`,
  { label: 'git-push-and-feishu', phase: 'Ship' }
)

log(shipResult)
return { date: TODAY, coverage: covStr, status: 'complete' }

// ── Schemas ────────────────────────────────────────────────────

const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    sector: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Chinese news headline' },
          description: { type: 'string', description: '2-3 sentence summary in Chinese' },
          sourceUrl: { type: 'string', description: 'Real URL to the source article' },
          sourceName: { type: 'string', description: 'Media name in Chinese' },
          tag: { type: 'string', description: 'Category tag like 政策, 行情, 安全事件, etc.' },
        },
        required: ['title', 'description', 'sourceUrl', 'sourceName'],
      },
    },
    highlights: {
      type: 'array',
      items: { type: 'string' },
      description: '2-3 key bullet highlights for this sector',
    },
  },
  required: ['sector', 'items'],
}
