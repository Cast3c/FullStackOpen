import { useBlogs } from '../hooks/useBlogs'
import { Link } from 'react-router-dom'
import Blog from '../components/Blog'
import NewBlogForm from '../components/NewBlogForm'

const Bloglist = () => {
  const { data: blogsData, isLoading, isError } = useBlogs()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        Loading blogs...
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        Error loading blogs
      </div>
    )
  }

  const sortedBlogs = blogsData
    ? [...blogsData].sort((a, b) => b.likes - a.likes)
    : []


  return (
    <div className='max-w-4xl mx-auto mt-10 px-4'>
      <div className='bg-white rounded-2xl shadow-lg p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Blogs</h2>
          <p className='text-gray-500 text-sm'>Create, list and create blogs</p>
        </div>

        {/* New blog form */}
        <NewBlogForm />

        {/* Blog list */}
        <div className='mt-2 divide-y'>
          {sortedBlogs.map(blog => (
            <Link key={blog.id} to={`/blogs/${blog.id}`} className='block py-4 px-2 rounded-sm hover:bg-gray-50 transition'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {blog.title}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    by {blog.author}
                  </p>
                </div>

                <div className='flex items-center gap-2 text-sm'>
                  <span>❤️</span>
                  <span className='font-semibold text-gray-700'>
                    {blog.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {sortedBlogs.length === 0 && (
          <p className='text-gray-500 italic mt-6'>
            No blogs found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Bloglist
