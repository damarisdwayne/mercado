import type { ReactNode } from 'react'
import { ThemeToggle } from './theme-toggle'

type HeaderProps = {
  title: string
  children?: ReactNode
}

export const Header = ({ title, children }: HeaderProps) => (
  <header
    className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 md:px-6"
    style={{
      paddingTop: 'env(safe-area-inset-top)',
      minHeight: 'calc(3.5rem + env(safe-area-inset-top))',
    }}
  >
    <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    <div className="flex items-center gap-1">
      {children}
      <ThemeToggle />
    </div>
  </header>
)
