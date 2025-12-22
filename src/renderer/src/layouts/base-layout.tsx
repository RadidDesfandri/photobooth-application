import { cn } from '@renderer/lib/utils'
import { JSX, ReactNode } from 'react'

interface BaseLayoutProps {
  children: ReactNode
  header?: ReactNode
  className?: string
}

function BaseLayout({ children, className, header }: BaseLayoutProps): JSX.Element {
  return (
    <div className="bg-background flex min-h-screen flex-col text-white">
      {header && (
        <header className="sticky top-0 z-20 border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">{header}</div>
          </div>
        </header>
      )}

      <main className={cn('mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8', className)}>
        {children}
      </main>
    </div>
  )
}

export default BaseLayout
