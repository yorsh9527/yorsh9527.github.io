import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '关于这个空间' })

export default function Page() {
  return (
    <div className="field-home field-page">
      <h1>你好，这是我的探索手记。</h1>
      <p className="page-intro">一个关于持续学习、动手实践和作品积累的个人空间。</p>
      <Link href="/journey" className="field-button">
        看看我的学习路线
      </Link>
      <section className="detail-panel">
        <h2>从好奇出发</h2>
        <p>
          目前，我正在探索 AI Agent 如何协助理解和二次开发开源项目，并尝试用 OpenCode 与 DeepSeek
          建立自己的开发工作流。这个网站，也是这段学习过程中的一个实践。
        </p>
      </section>
      <section className="detail-panel">
        <h2>我想在这里留下什么</h2>
        <p>
          学习路线：把下一步变得清楚。实践作品：让想法拥有具体的形状。学习记录：保留踩过的坑、做过的选择，以及值得再次思考的问题。
        </p>
      </section>
      <section className="detail-panel">
        <h2>保持真实，持续更新</h2>
        <p>
          这里只展示实际发生的进展，并明确区分完成、进行中和计划中的内容。姓名、头像、联系方式和过往经历尚待补充，暂以「探索手记」作为站点名称。
        </p>
      </section>
    </div>
  )
}
