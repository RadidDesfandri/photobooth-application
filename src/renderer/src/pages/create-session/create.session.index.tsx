import { Button } from '@renderer/components/ui/button'
import BaseLayout from '@renderer/layouts/base-layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CreateSessionIndex(): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <BaseLayout className="flex flex-col gap-3">
      <h1>Create Session</h1>
      <Button onClick={() => navigate('/live-capture/SESSION_20251230_095800_99256d72')}>
        Start Session
      </Button>
    </BaseLayout>
  )
}

export default CreateSessionIndex
