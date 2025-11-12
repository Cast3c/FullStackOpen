import { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <VisibilityFilter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App
