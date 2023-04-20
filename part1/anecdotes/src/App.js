import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

const App = (props) => {
  const anecdoteVoteCount = {}

  for (let i = 0; i < anecdotes.length; i++) {
    anecdoteVoteCount[i] =0
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdoteVoteCount);

  const setToAnecdote = ({anecdotes}) => {
     return setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const setVoteAnecdote = ()=>{
    const contVote = {...votes}
    contVote[selected] += 1
    setVotes(contVote)
  }
  
  const maxVote = Object.values(votes).reduce((x, y) => { return votes[x] >= votes[y] ? x :y})
  console.log(anecdotes[maxVote])
  console.log(votes)
  console.log(maxVote)
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <h2>Has {votes[selected]} votes</h2>
      <Button handleClick={() => setToAnecdote({anecdotes})} text='Next anecdote' />
      <Button handleClick={setVoteAnecdote} text='like' />
      <h1>Anecdote  whit most likes is:</h1>
      <p>{anecdotes[maxVote]}</p>
      <h2>has {votes[maxVote]} votes</h2>
    </div>
  )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]



ReactDOM.createRoot(document.getElementById('root')).render(<App anecdotes={anecdotes}/>);