import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/userContext'
import blogService from '../services/blogs'

const NavBar = () => {
  const [user, userDispatch] = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({ type: 'LOGOUT' })
    blogService.setToken(null)
    navigate('/')
  }

  return (
    <div >
      <nav className='flex items-center justify-between px-4 py-2 bg-linear-to-r from-blue-600 to purple-600'>
        <div>{user ? user.name : 'Guest'}</div>
        <div className='flex justify-center gap-10'>
          <Link to={'/'} >Home</Link>
          <Link to={'/blogs'} >Blogs</Link>
          <Link to={'/users'} >Users</Link>
        </div>
        <div>
          {user ? <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600' onClick={handleLogout} >Logout</button> : <Link to={'/login'}>Login</Link>}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
