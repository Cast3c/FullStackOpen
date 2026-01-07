import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUsers'

const UserPage = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useUser(id)

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        User data is loading...
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className='flex justify-center items-center h-64 text-red-500'>
            User not found
      </div>
    )}

  return (
    <div className='max-w-4xl mx-auto mt-10 px-4'>
      {/* User Card */}
      <div className='bg-white rounded-2xl shdow-lg p-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm: justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>
              {user.name}
            </h2>
            <p className='text-gray-500'>@{user.username}</p>
          </div>

          <div className='bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold'>
            {user.blogs.length} blogs created
          </div>
        </div>

        {/* Divider */}
        <hr className='my-6'/>

        {/* Blogs */}
        <div>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            Added blogs
          </h3>

          {user.blogs.length === 0 ? (
            <p className='text-gray-500 italic'>
                This user has not Added any blogs yet.
            </p>
          ): (
            <ul className='space-y-3'>
              {user.blogs.map(blog => (
                <li key={blog.id} className='flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl'>
                  <span className='font-medium text-gray-800'>
                    {blog.title}
                  </span>
                  {blog.likes !== undefined && (
                    <span className='text-sm text-gray-500'>
                       ❤️ {blog.likes}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage