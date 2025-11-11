import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App
