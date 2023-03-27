import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Content = (props) =>{
  return (
    <div>
      {props.parts.map((item)=>{
        return <p>{item.name} {item.exercises}</p>
        })
      }
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      <p> Number of exercises {props.parts.reduce((acum, valexercise)=> {
       return acum += valexercise.exercises},0
      )}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name:'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))