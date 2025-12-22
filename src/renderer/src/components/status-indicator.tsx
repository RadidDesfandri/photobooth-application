import { cn } from '@/lib/utils'
import { Check, X, AlertTriangle, Loader2 } from 'lucide-react'
import { JSX } from 'react'

type StatusType = 'connected' | 'disconnected' | 'warning' | 'loading'

interface StatusIndicatorProps {
  status: StatusType
  label: string
  sublabel?: string
  className?: string
}

const statusConfig = {
  connected: {
    icon: Check,
    bgColor: 'bg-success/20',
    textColor: 'text-success',
    dotColor: 'bg-success',
    glowClass: 'status-glow-connected'
  },
  disconnected: {
    icon: X,
    bgColor: 'bg-destructive/20',
    textColor: 'text-destructive',
    dotColor: 'bg-destructive',
    glowClass: 'status-glow-disconnected'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-warning/20',
    textColor: 'text-warning',
    dotColor: 'bg-warning',
    glowClass: ''
  },
  loading: {
    icon: Loader2,
    bgColor: 'bg-muted',
    textColor: 'text-muted-foreground',
    dotColor: 'bg-muted-foreground',
    glowClass: ''
  }
}

export function StatusIndicator({
  status,
  label,
  sublabel,
  className
}: StatusIndicatorProps): JSX.Element {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl px-4 py-2 transition-all duration-300',
        config.bgColor,
        config.glowClass,
        className
      )}
    >
      <div
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full',
          config.dotColor,
          status === 'loading' && 'animate-spin'
        )}
      >
        <Icon
          className={cn('h-3 w-3', status === 'loading' ? 'text-background' : 'text-background')}
        />
      </div>
      <div className="flex flex-col">
        <span className={cn('text-sm font-semibold', config.textColor)}>{label}</span>
        {sublabel && <span className="text-muted-foreground text-xs">{sublabel}</span>}
      </div>
    </div>
  )
}
