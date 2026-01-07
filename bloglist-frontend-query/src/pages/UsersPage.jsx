import { Link } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'

const UsersPage = () => {
  const { data: users, isLoading, isError } = useUsers()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        Loading users...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading users
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 px-4'>
      <div className='bg-white rounded-2xl shdow-lg p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Users</h2>
          <p className='text-gray-500 text-sm'>
            List of registered users
          </p>
        </div>

        {/* Table header */}
        <div className='grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600 border-b pb-2'>
          <span className='col-span-2'>User</span>
          <span className='text-right'>Blogs created</span>
        </div>

        {/* Users list */}
        <div className='mt-2 divide-y'>
          {users.map(user => (
            <Link key={user.id} to={`/users/${user.id}`} className='grid grid-cols-3 gap-4 items-center py-3 hover:bg-gray-50 transition px-2'>
              <span className='col-span-2 text-gray-800 font-medium'>
                {user.name}
              </span>

              <span className='text-right'>
                <span className='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm font-semibold'>
                  {user.blogs.length}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {users.length === 0 && (
        <p className='text-gray-500 italic mt-6'>
          No users found.
        </p>
      )}
    </div>
  )
}

export default UsersPage