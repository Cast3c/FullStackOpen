import { useState } from 'react'

const BlogList = ({ blog, updateBlog, deleteBlog, user }) => {
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

  const [showInfo, setShowInfo] = useState(false)
  const [buttonLabel, setButtonLabel] = useState(true)

  const revealInfo = { display: showInfo ? '' : 'none' }
  const label = buttonLabel ? 'View info' : 'Hide info'

  // console.log('Blog completo: ',blog)

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

    updateBlog(blog.id, updatedBlog)
  }

  const isOwner = blog.user.username === user.username

  const handleDelete = () => {
    if (window.confirm(`Are you sure to delete the blog: '${blog.title}' ?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
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
