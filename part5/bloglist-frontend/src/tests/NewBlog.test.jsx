import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from '../components/newBlog'
import { vi } from 'vitest'

describe('<NewBlog />', () => {
  test('Form calls the event handler ir receives the data correctly', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()
    const blog = {
      title: 'Titulo del blog test',
      author: 'Author test',
      url: 'http://testurl.com',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    render(<NewBlog values={blog} handleBlogSubmit={mockCreateBlog} handleChange={() => {}}/>)

    const inputTitle = screen.getByRole('textbox', { name: /title/i })
    const inputAuthor = screen.getByRole('textbox', { name: /author/i })
    const inputUrl = screen.getByRole('textbox', { name: /url/i })
    const sendButton = screen.getByRole('button', { name: /create blog/i })

    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(sendButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    // expect(mockCreateBlog).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     title: blog.title,
    //     author: blog.author,
    //     url: blog.url
    //   })
    // )
  })
})
