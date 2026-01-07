import { useParams, useNavigate } from 'react-router-dom'
import { useBlog, useLikeBlog, useAddComment, useDeleteBlog } from '../hooks/useBlogs'
import { useUser } from '../contexts/userContext'
import { useForm } from '../hooks/useForm'
import { useNotification } from '../contexts/notificationContext'
import { showNotifications } from '../contexts/notificationActions'
import Notifications from '../components/Notifications'

const BlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const{ data: blog, isLoading, isError } = useBlog(id)
  const [user] = useUser()
  const [,notificationDispatch] = useNotification()
  const likeBlogMutation = useLikeBlog()
  const commentBlogMutation = useAddComment()
  const deleteBlogMutation = useDeleteBlog()
  const commentForm = useForm({ comment:'' })

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

    likeBlogMutation.mutate({ id: blog.id, updatedBlog },
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

  const handleAddComment = event => {
    event.preventDefault()

    if (!commentForm.values.comment.trim()) return

    commentBlogMutation.mutate({ id: blog.id, comment: commentForm.values.comment }, {
      onSuccess: () => {
        commentForm.reset()
        showNotifications(notificationDispatch,
          'Comment added',
          'success',
          3
        )
      },
      onError: () => {
        commentForm.reset()
        showNotifications(
          notificationDispatch,
          'Error adding comment',
          'error',
          5
        )
      }
    })
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
      {/* Comments */}
      <div className="pt-6 border-t">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
    💬 Comments
        </h3>

        {/* Add comment form */}
        <form
          onSubmit={handleAddComment}
          className="flex gap-3 mb-6"
        >
          <input
            type="text"
            name="comment"
            value={commentForm.values.comment}
            onChange={commentForm.handleChange}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
      Add
          </button>
        </form>

        {/* Comments list */}
        {blog.comments?.length > 0 ? (
          <ul className="space-y-3">
            {blog.comments.map((comment, index) => (
              <li
                key={index}
                className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700"
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">
      No comments yet.
          </p>
        )}
      </div>

    </div>
  )
}

export default BlogPage