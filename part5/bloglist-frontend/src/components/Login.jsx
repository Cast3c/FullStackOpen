const LoginForm = ({ values, handleLogin, handleChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={values.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
