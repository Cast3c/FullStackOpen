import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            {anecdote.content}
            <span> Has {anecdote.votes} votes </span>
            <button onClick={handleClick}>Vote</button>
            <p></p>
        </li>
    )
}

const AnecdotesList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector( state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes((state.filter).toLowerCase()))
    })

    const sortAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <>
            {sortAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>{
                        dispatch(voteAnecdote(anecdote))
                        dispatch(showMessage(`You voted '${anecdote.content}'`, 2))
                    }}
                />
            )}
        </>
    )
}

export default AnecdotesList
