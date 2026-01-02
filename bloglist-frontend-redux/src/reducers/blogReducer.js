import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    replaceBlog(state, action){
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removeBlog(state, action){
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlogAsync = (id, blogData) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(id, blogData)
    dispatch(replaceBlog(updateBlog))
  }
}

export const deleteBlogAsync = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}


export default blogSlice.reducer