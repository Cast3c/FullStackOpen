const LoginForm = ({ values, handleLogin, handleChange }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700">
      <div className='w-full max-w-md bg-white rounded-2xl shdow-xl p-8'>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-2">Log in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={values.username}
              name="username"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              password
            </label>
            <input
              type="password"
              value={values.password}
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
