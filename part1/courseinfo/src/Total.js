import React from "react"

const Total = (props) =>{
    return(
      <div>
        <p> Number of exercises {props.parts.reduce((acum, valexercise)=> {
         return acum += valexercise.exercises},0
        )}</p>
      </div>
    )
  }

  export default Total