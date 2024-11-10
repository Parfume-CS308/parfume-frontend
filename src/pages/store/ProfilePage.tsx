import useAuth from '@/hooks/contexts/useAuth'
import React from 'react'

type Props = {}

enum VIEW_MODES {
  VIEW = 'view',
  EDIT = 'edit'
}

const ProfilePage = (props: Props) => {
  const [mode, setMode] = React.useState<VIEW_MODES>(VIEW_MODES.VIEW)
  const { user } = useAuth()
  return (
    <div className='bg-white w-full h-full rounded p-4'>
      <div className='flex flex-col items-center w-full'>
        <div className='w-32 h-32 bg-gray-400 rounded-full'></div>
        <div className='mt-4 text-xl font-medium'>
          {user?.firstName} {user?.lastName}
        </div>
        <div className='mt-2 text-sm text-gray-400'>{user?.email}</div>
        <div className='mt-2 text-sm text-gray-400'>{user?.gender}</div>
        <div className='mt-2 text-sm text-gray-400'>{user?.age}</div>
      </div>
      <div>
        <p className='text-2xl font-medium'>My latest orders</p>
      </div>
    </div>
  )
}

export default ProfilePage
