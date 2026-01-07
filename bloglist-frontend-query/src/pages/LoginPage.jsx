import { useUser } from '../contexts/userContext'
import LoginForm from '../components/Login'
import { useForm } from '../hooks/useForm'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNotification } from '../contexts/notificationContext'
import { showNotifications } from '../contexts/notificationActions'
import Notifications from '../components/Notifications'
import { useNavigate, useLocation } from 'react-router-dom'



const LoginPage = () => {
  const [, userDispatch] = useUser()
  const loginForm = useForm({ username: '', password: '' })
  const [, notificationDispatch] = useNotification()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(loginForm.values)
      const from = location.state?.from?.pathname || '/blogs'
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
      showNotifications(
        notificationDispatch,
        `Welcome, '${user.name}'`,
        'success',
        5
      )
      loginForm.reset()
      navigate(from, { replace: true })
    } catch (exception) {
      console.log('Error completo: ', exception)
      showNotifications(notificationDispatch, 'Wrong credentials', 'error', 5)
    }
  }

  return (
    <div>
      <Notifications />
      <LoginForm
        values={loginForm.values}
        handleLogin={handleLogin}
        handleChange={loginForm.handleChange}
      />
    </div>
  )
}

export default LoginPage