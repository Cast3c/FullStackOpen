import { createSlice } from '@reduxjs/toolkit'
import anecdotesServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers:{
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    updateAnecdote(state, action){
      const updated = action.payload
      return state.map((anecdote) => (anecdote.id !== updated.id ? anecdote : updated))
    }
  }
})
export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch =>{
    const update = await anecdotesServices.update({
      ...anecdote,
      votes: anecdote.votes +1
    })
    dispatch(updateAnecdote(update))
  }
}

export default anecdoteSlice.reducer
