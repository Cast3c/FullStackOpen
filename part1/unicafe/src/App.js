import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import BtnOption from './BtnOption'
import Statistics from './Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandleClick = () =>{
    setGood(good+1)
  }

  const neutralHandleClick = () =>{
    setNeutral(neutral+1)
  }

  const badHandleClick = () =>{
    setBad(bad+1)
  }


  return(
    <div>
      <Title title="Give feedback"/>
      <BtnOption handleClick={goodHandleClick} option="good"/>
      <BtnOption handleClick={neutralHandleClick} option="neutral"/>
      <BtnOption handleClick={badHandleClick} option="bad"/>
      <Title title="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
