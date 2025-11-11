import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {
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
