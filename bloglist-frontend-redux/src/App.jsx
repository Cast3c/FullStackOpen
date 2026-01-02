import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/newBlog'
import Notifications from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import { useForm } from './hooks/useForm'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, deleteBlogAsync, updateBlogAsync } from './reducers/blogReducer'


const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const loginForm = useForm({ username:'', password:'' })
  const blogForm = useForm({ title: '', author: '', url: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => [...state.blogs].sort((a,b) => b.likes - a.likes))

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(loginForm.values)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      loginForm.reset()
      dispatch(showNotification(`Welcome back ${user.name}`, 'success',5))
    } catch(exception){
      console.log('Error completo: ', exception)
      dispatch(showNotification('Wrong username or password', 'error', 5))
    }

  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
      const newblog = blogForm.values
      dispatch(createBlog(newblog))
      // setBlogs(blogs.concat(newblog))
      blogForm.reset()
      blogFormRef.current.toggleVisibility()
      dispatch(showNotification(`A new blog '${newblog.title}' by ${newblog.author} added`, 'success', 5))
    }catch(exception){
      console.log('Error completo: ', exception)
      dispatch(showNotification('Error creating blog', 'error', 5))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      await dispatch(updateBlogAsync(id, updatedBlog))
      dispatch(showNotification('Blog updated: succesfully', 'success', 5))
    } catch (exception) {
      console.log('Error completo: ', exception)
      dispatch(showNotification('Error updating blog', 'error', 5))
    }
  }

  const deleteBlog = async (id) => {
    try{
      await dispatch(deleteBlogAsync(id))
      dispatch(showNotification('Blog Deleted successfully', 'success', 5))
    }catch(exception){
      console.log('Error completo: ', exception)
      dispatch(showNotification('Error deleting blog', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    loginForm.reset()
  }

  return (
    <div>
      <Notifications/>
      {!user && (<LoginForm
        values={loginForm.values}
        handleChange={loginForm.handleChange}
        handleLogin={handleLogin}
      />)}
      {user && (<div>
        <p>{user.name} Logged - in </p>
        <button onClick={handleLogout}>Log out</button>
        <h2>blogs</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlog
            handleBlogSubmit={handleNewBlog}
            values={blogForm.values}
            handleChange={blogForm.handleChange}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>)}
    </div>
  )
}

export default App