import { useEffect } from 'react'
import { useUser } from './contexts/userContext'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import Bloglist from './pages/Bloglist'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import UsersPage from './pages/UsersPage'
import RequireAuth from './components/RequireAuth'
import UserPage from './pages/UserPage'
import BlogPage from './pages/BlogPage'

const App = () => {
  const [user] = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/blogs')
    }
  }, [])

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<RequireAuth><Bloglist /></RequireAuth>} />
        <Route path="/users" element={<RequireAuth><UsersPage /></RequireAuth>} />
        <Route path='/users/:id' element={<RequireAuth><UserPage /></RequireAuth>} />
        <Route path='/blogs/:id' element={<RequireAuth><BlogPage /></RequireAuth>} ></Route>
      </Routes>

      {/* <div>
        <Notifications />
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
          <Bloglist />
        </div>)}
      </div> */}
    </div>
  )
}

export default App
