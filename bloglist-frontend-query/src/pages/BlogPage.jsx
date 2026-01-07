import { useParams, useNavigate } from 'react-router-dom'
import { useBlog, useUpdateBlog, useDeleteBlog } from '../hooks/useBlogs'
import { useUser } from '../contexts/userContext'
import { useNotification } from '../contexts/notificationContext'
import { showNotifications } from '../contexts/notificationActions'
import Notifications from '../components/Notifications'

const BlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const{ data: blog, isLoading, isError } = useBlog(id)
  const [user] = useUser()
  const [,notificationDispatch] = useNotification()
  const updateBlogMutation = useUpdateBlog()
  const deleteBlogMutation = useDeleteBlog()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
            Loading blog data...
      </div>
    )
  }

  if (isError || !blog) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Blog not found
      </div>
    )
  }

  const isOwner = user && blog.user?.username === user.username

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1
    }

    updateBlogMutation.mutate({ id: blog.id, updatedBlog },
      {
        onSuccess: () => {
          showNotifications(notificationDispatch,
            `You liked '${blog.title}'`,
            'success',
            5
          )
        },
        onError: () => {
          showNotifications(notificationDispatch,
            'Error updating blog',
            5
          )
        }
      }
    )
  }

  const handleDelete = () => {
    if (!window.confirm(`Delete '${blog.title}'?`))return
    deleteBlogMutation.mutate(blog.id,
      {
        onSuccess: () => {
          navigate('/blogs')
        }
      },
      {
        onError: () => {
          showNotifications(notificationDispatch,
            'Error deleting blog',
            'error',
            5
          )
        }
      })
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 px-4'>
      <Notifications />
      <div className='bg-white rounded-2xl shadow-lg p-6 space-y-6'>
        {/* Title */}
        <div>
          <h2 className='text-3xl font-bold text-gray-800' >
            {blog.title}
          </h2>
          <p className='text-gray-500 mt-1'>
            by {blog.author}
          </p>
        </div>

        {/* URL */}
        <div>
          <a href={blog.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline break-all'>
            {blog.url}
          </a>
        </div>

        {/* Likes */}
        <div className='flex items-center gap-4'>
          <span className='text-lg font-semibold text-gray-700'>
              ❤️ {blog.likes}
          </span>
          <button onClick={handleLike} className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>Like</button>
        </div>

        {/* User */}
        <div className='text-sm text-gray-500'>
            Added by <span className='font-semibold'>{blog.user?.name}</span>
        </div>

        {/* Delete */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
          >
                Delete blog
          </button>
        )}

      </div>
    </div>
  )
}

export default BlogPage