import { useState } from 'react'
import { useLikeBlog, useDeleteBlog } from '../hooks/useBlogs'
import { useUser } from '../contexts/userContext'
import { useNotification } from '../contexts/notificationContext'
import { showNotifications } from '../contexts/notificationActions'

const BlogList = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [buttonLabel, setButtonLabel] = useState(true)
  const [ user ] = useUser()
  const updateBlogMutation = useLikeBlog()
  const deleteBlogMutation = useDeleteBlog()
  const [, notificationDispatch] = useNotification()

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogTitle = {
    fontSize: '1rem',
    fontWeight: 'bold'
  }

  const revealInfo = { display: showInfo ? '' : 'none' }
  const label = buttonLabel ? 'View info' : 'Hide info'


  const toggleVisibility = () => {
    setShowInfo(!showInfo)
    setButtonLabel(!buttonLabel)
  }

  const handleLike = () => {
    console.log('blog likes: ', blog.likes)
    const updatedBlog = {
      user: blog.user.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlogMutation.mutate(
      { id: blog.id, updatedBlog },
      {
        onSuccess: () => {
          showNotifications(notificationDispatch,
            `You liked '${blog.title}'`,
            'success',
            5
          )
        }
      },
      {
        onError: () => {
          showNotifications(notificationDispatch,
            'Error updating blog',
            'error',
            5
          )
        }
      }
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure to delete the blog: '${blog.title}' ?`)) {
      deleteBlogMutation.mutate(
        blog.id,
        {
          onSuccess: () => {
            showNotifications(
              notificationDispatch,
              `Blog '${blog.title}' deleted successfully`,
              'success',
              5
            )
          }
        },
        {
          onError: () => {
            showNotifications(
              notificationDispatch,
              'Error deleting blog',
              'error',
              5
            )
          }
        }
      )
    }
  }

  const isOwner =
    user &&
    blog.user &&
    typeof blog.user === 'object' &&
    blog.user.username === user.username

  return (
    <div style={blogStyle} key={blog.id}>
      <div style={blogTitle}>
        Title: {blog.title}
        <div>
          author:
          {blog.author}
        </div>
        <button onClick={toggleVisibility}> {label} </button>
      </div>
      <div style={revealInfo}>
        <div>
          Url:
          {blog.url}
        </div>
        <div>Created by: {blog.user.name}</div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
          {isOwner && <button onClick={handleDelete}>delete</button>}
        </div>
      </div>
    </div>
  )
}

export default BlogList
