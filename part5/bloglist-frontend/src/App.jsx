import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/newBlog'
import Notifications from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import { useForm } from './hooks/useForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)
  const loginForm = useForm({ username:'', password:'' })
  const blogForm = useForm({ title: '', author: '', url: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs([...blogs].sort((a,b) => b.likes - a.likes)))
  }, [])

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
      setErrorMessage(`Welcome, '${user.name}'`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(exception){
      console.log('Error completo: ', exception)
      setErrorMessage('Wrong credentials')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
      const newblog = await blogService.create(blogForm.values)
      setBlogs(blogs.concat(newblog))
      blogForm.reset()
      blogFormRef.current.toggleVisibility()
      setErrorMessage(`Blog '${newblog.title}' by '${newblog.author}' added successfully`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception){
      console.log('Error completo: ', exception)
      setErrorMessage('Error creating blog')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(prevBlogs =>
        [...prevBlogs].map(blog => blog.id !== id ? blog : returnedBlog)
          .sort((a,b) => b.likes - a.likes)
      )

      setErrorMessage(`You liked '${returnedBlog.title}'`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('Error completo: ', exception)
      setErrorMessage('Error updating blog')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      const response = await blogService.deleteBlog(id)
      setBlogs(prevBlogs =>
        [...prevBlogs].filter(blog => blog.id !== id)
      )
      setErrorMessage(`Deleted successfully: '${response.title}'`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception){
      console.log('Error completo: ', exception)
      setErrorMessage('Error deleting blog')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      <Notifications message={errorMessage} typeMessage={typeMessage}/>
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