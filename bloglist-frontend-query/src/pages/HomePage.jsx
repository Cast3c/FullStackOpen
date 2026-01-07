import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            BlogList App
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A full-stack blog management application built with React, React
            Query, Context API, Node.js and MongoDB.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4">
            <div className='text-center text-2xl font-bold text-gray-600'>
              <h2> You can: </h2>
            </div>
            <div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto font-black'>
              <Link
                to="/blogs"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Log-in/out
              </Link>

              <Link
                to="/users"
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
              >
                Create/eliminate blogs
              </Link>
              <Link
                to="/blogs"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                View Blogs
              </Link>

              <Link
                to="/users"
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
              >
                View Users
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600">React</h3>
            <p className="mt-2 text-gray-600">Modern component-based UI</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600">React Query</h3>
            <p className="mt-2 text-gray-600">Server state management</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600">Context API</h3>
            <p className="mt-2 text-gray-600">Authentication & notifications</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Explore the application
          </h2>
          <p className="mt-4 text-blue-100">
            Browse blogs, check users and interact with content.
          </p>

          <Link
            to="/blogs"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-600 font-medium hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
