import { Button } from '@renderer/components/ui/button'
import { JSX } from 'react'
import { usePingCamera } from '../../hooks/useCamera'
import BaseLayout from '@renderer/layouts/base-layout'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '@renderer/components/loading'

function HomeIndex(): JSX.Element {
  const { data, isPending, refetch } = usePingCamera()
  const navigate = useNavigate()

  const HomeHeader: JSX.Element = (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Dashboard Photobooth</h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">Halo, Admin</span>
        <Button variant="outline" onClick={() => navigate('/create-session')}>
          Booth
        </Button>
      </div>
    </>
  )

  return (
    <BaseLayout header={HomeHeader}>
      {isPending ? (
        <Loading />
      ) : (
        <div className="flex w-fit flex-col gap-2">
          <h1>Camera Status</h1>
          <Link to="/tes">Test api page</Link>
          <div className="status-indicator success">● Connected</div>
          <pre>{JSON.stringify(data?.data, null, 2)}</pre>
          <Button onClick={() => refetch()}>Refresh</Button>
          <Button onClick={() => navigate('/camera-control')}>Camera Control</Button>
        </div>
      )}
    </BaseLayout>
  )
}

export default HomeIndex
