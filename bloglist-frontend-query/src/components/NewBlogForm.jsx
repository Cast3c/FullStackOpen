import { useForm } from '../hooks/useForm'
import { useCreateBlog } from '../hooks/useBlogs'
import { useNotification } from '../contexts/notificationContext'
import { showNotifications } from '../contexts/notificationActions'
import { useState } from 'react'

const NewBlogForm = () => {
  const [open, setOpen] = useState(false)

  const [, notificationDispatch] = useNotification()
  const createBlogMutation = useCreateBlog()
  const blogForm = useForm({ title:'', author:'', url:'' })

  const handleNewBlog = async event => {
    event.preventDefault()
    try {
      createBlogMutation.mutate(blogForm.values)
      blogForm.reset()
      setOpen(false)
      showNotifications(
        notificationDispatch,
        `Blog '${blogForm.values.title}' by '${blogForm.values.author}' added successfully`,
        'success',
        5
      )
    } catch (exception) {
      console.log('Error completo: ', exception)
      showNotifications(notificationDispatch, 'Error creating blog', 'error', 5)
    }
  }

  return (
    <div className='mb-6'>
      <button onClick={() => setOpen(!open)} className='mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
        {open ? 'Cancel' : 'New blog'}
      </button>

      {open && (
        <form onSubmit={handleNewBlog} className='bg-gray-50 p-4 rounded-xl shadow-inner space-y-6' >
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              name='title'
              value={blogForm.values.title}
              onChange={blogForm.handleChange}
              className='w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200'
            />

            <div>
              <label className='block text-sm font-medium text-gray-700' >
                Author
              </label>
              <input
                type='text'
                name='author'
                value={blogForm.values.author}
                onChange={blogForm.handleChange}
                className='w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700' >
                Url
              </label>
              <input
                type='text'
                name='url'
                value={blogForm.values.url}
                onChange={blogForm.handleChange}
                className='w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200'
              />
            </div>

            <button type='submit' className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition'>
              Create blog
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NewBlogForm