import { ReactNode } from 'react'
export default function SectionContainer({ children }: { children: ReactNode }) {
  return <div className="site-container">{children}</div>
}
