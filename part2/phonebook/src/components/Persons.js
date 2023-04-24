import React from "react";

const Persons = ({namesToShow}) => {
  return (
    <ul>
      {namesToShow.map((name) => (
        <li key={name.name}>
          {name.name} {name.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons
