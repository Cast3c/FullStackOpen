import React from "react";

const Content = ({ courses }) => {
    console.log("The content received on content", courses);
    return ( 
        <div>
            {(courses.parts).map(part => {
                return (
                <p key={part.id}>{part.name} {part.exercises}</p>
                )
            })}
        </div>
    )
}

export default Content