import React from "react";

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

  export default Content;