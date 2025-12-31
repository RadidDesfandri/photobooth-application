import { Button } from '@renderer/components/ui/button'
import { useCreateSession } from '@renderer/hooks/useCamera'
import BaseLayout from '@renderer/layouts/base-layout'
import { ArrowRight, Camera, Printer, Sparkles } from 'lucide-react'
import React from 'react'

function CreateSessionIndex(): React.JSX.Element {
  const { mutate: createSession, isPending } = useCreateSession()

  const steps = [
    { icon: Camera, label: 'Capture', description: 'Strike a pose' },
    { icon: Sparkles, label: 'Edit', description: 'Add your style' },
    { icon: Printer, label: 'Print', description: 'Take it home' }
  ]

  return (
    <BaseLayout className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-accent/10 absolute top-20 left-10 h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-accent/15 absolute right-10 bottom-20 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Logo/Title */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 duration-700">
          <div className="bg-accent/20 border-accent/30 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border">
            <Camera className="text-accent h-10 w-10" />
          </div>
          <h1 className="text-foreground mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            Photo Booth
          </h1>
          <p className="text-muted-foreground text-xl">Capture memories, create magic</p>
        </div>

        {/* Steps */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-12 flex items-center gap-4 delay-150 duration-700 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-card border-border mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg md:h-16 md:w-16">
                  <step.icon className="text-accent h-6 w-6 md:h-7 md:w-7" />
                </div>
                <span className="text-foreground text-sm font-medium">{step.label}</span>
                <span className="text-muted-foreground hidden text-xs md:block">
                  {step.description}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="text-muted-foreground/50 -mt-6 h-5 w-5" />
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={() => createSession()}
          size="lg"
          disabled={isPending}
          className="group animate-in fade-in slide-in-from-bottom-4 rounded-2xl py-8 text-xl font-semibold shadow-2xl transition-all delay-300 duration-700 hover:scale-105 has-[>svg]:px-12"
        >
          Start Session
          <ArrowRight className="ml-3 size-4 h-6 w-6 transition-transform group-hover:translate-x-1" />
        </Button>

        <p className="text-muted-foreground animate-in fade-in mt-6 text-sm delay-500 duration-700">
          Tap to begin your photo experience
        </p>
      </div>

      <div className="text-muted-foreground/50 absolute bottom-6 text-center text-xs">
        Touch screen to interact
      </div>
    </BaseLayout>
  )
}

export default CreateSessionIndex
