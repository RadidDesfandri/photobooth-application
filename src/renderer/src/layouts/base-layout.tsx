import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { cn } from '@renderer/lib/utils'
import { JSX, ReactNode } from 'react'

interface BaseLayoutProps {
  children: ReactNode
  header?: ReactNode
  className?: string
  sticky?: boolean
}

function BaseLayout({ children, className, header, sticky = false }: BaseLayoutProps): JSX.Element {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="bg-background flex min-h-screen flex-col text-white">
        {header && (
          <header
            className={cn('border-b border-gray-200 shadow-sm', sticky && 'sticky top-0 z-20')}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between">{header}</div>
            </div>
          </header>
        )}

        <main
          className={cn('mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8', className)}
        >
          {children}
        </main>
      </div>
    </ScrollArea>
  )
}

export default BaseLayout
