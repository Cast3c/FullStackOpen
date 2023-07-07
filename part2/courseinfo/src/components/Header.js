import React from "react";

const Header = ({ courses }) => {
    // const names = courses.map(course => course.name)
    // console.log(names);
    console.log("The content for Header props is", courses.name);
    return (
        <div>
            <h2>{courses.name}</h2>
        </div>
    )
}

export default Header