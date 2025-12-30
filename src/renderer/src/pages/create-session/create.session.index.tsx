import { Button } from '@renderer/components/ui/button'
import { useCreateSession } from '@renderer/hooks/useCamera'
import BaseLayout from '@renderer/layouts/base-layout'
import React from 'react'

function CreateSessionIndex(): React.JSX.Element {
  const { mutate: createSession, isPending } = useCreateSession()

  return (
    <BaseLayout className="flex flex-col gap-3">
      <h1>Create Session</h1>
      <Button onClick={() => createSession()} disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Session'}
      </Button>
    </BaseLayout>
  )
}

export default CreateSessionIndex
