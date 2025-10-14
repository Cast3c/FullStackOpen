import { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/newBlog'
import Notifications from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import { useForm } from './hooks/useForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)
  const loginForm = useForm({ username: '', password: '' }) 
  const blogForm = useForm({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))  
  }, [])

  // const handleChange = (event) => {
  //   const {name, value} = event.target
  //   setCredentials({
  //     ...credentials, [name]: value
  //   })
  // }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(loginForm.values)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      loginForm.reset
      setErrorMessage(`Welcome, '${user.name}'`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(exception){
      console.log('Error completo: ', exception)
      setErrorMessage('Wrong credentials')
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
      setErrorMessage(`Blog '${newblog.title}' by '${newblog.author}' added successfully`)
      setTypeMessage('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exeption){
      console.log('Error completo: ', exception)
      setErrorMessage('Error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    loginForm.reset()
  }

  return (
    <div>
      <Notifications message={errorMessage} typeMessage={typeMessage}/>
      {user === null ?(<LoginForm 
        values={loginForm.values}
        handleChange={loginForm.handleChange}
        handleLogin={handleLogin}
      />) :
        <div>
          <p>{user.name} Logged - in </p>
          <button onClick={handleLogout}>Log out</button>
          <h2>blogs</h2>
          <NewBlog 
            values={blogForm.values}
            handleChange={blogForm.handleChange}
            handleBlogSubmit={handleNewBlog}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      }
     
    </div>
  )
}

export default App