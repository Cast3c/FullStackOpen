import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog/>', ()=> {
   const blog = {
      title: 'Titulo del blog test',
      author: 'Author test',
      url:'http://testurl.com',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const user = {
      username: 'testuser',
      name: 'Test user'
    }

  test('renders content', () => {
    render(<Blog blog={blog} user={user} />)

    const title = screen.getByText('Titulo del blog test', {exact: false})
    const author = screen.getByText('Author test', {exact: false})
    const url = screen.queryByText('http://testrl.com')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
  })

  test('Clicking the button shows url and likes', async () => {
    render(<Blog blog={blog} user={user}/>)
    const userEventSetup = userEvent.setup()
    const button = screen.getByText('View info')
    await userEventSetup.click(button)

    expect(screen.getByText('http://testurl.com', {exact: false})).toBeDefined()
  })

  test('If the like button is clicked twice, the event handler is called twice', async () => {
    //mock del handleLike
    const mockHandleLike = vi.fn()
    render(<Blog blog={blog} user={user} updateBlog={mockHandleLike} />)

    const userClick = userEvent.setup()

    //muestra detalles para ver el boton like
    const viewButton = screen.getByText('View info')
    await userClick.click(viewButton)

    const likeButton = screen.getByText('like')
    await userClick.click(likeButton)
    await userClick.click(likeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
  })

  
})


