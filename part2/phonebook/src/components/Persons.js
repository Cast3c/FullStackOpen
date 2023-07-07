import React from "react";

const Persons = ({namesToShow, deletePerson}) => {
  return (
    // <ul>
    //   {namesToShow.map((name) => (
    //     <li key={name.id}>
    //       {name.name} {name.number}
    //       <button onClick={deletePerson}>delete</button>
    //     </li>
    //   ))}
    // </ul>
    <li>
      {namesToShow.name} {namesToShow.number}
      <button onClick = {deletePerson}>delete</button>
    </li>
  );
  
};

export default Persons
 