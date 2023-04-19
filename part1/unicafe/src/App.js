import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import BtnOption from './BtnOption'
import Result from './Result' 

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
      <Result option="good" cant={good}/>
      <Result option="neutral" cant={neutral}/>
      <Result option="bad" cant={bad}/>
    </div>
  )
}

export default App;
