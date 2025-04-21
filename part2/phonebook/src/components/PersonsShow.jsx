import React from "react";

const PersonsShow = ({ persons, dltBtn }) => {
  return (
    <table> 
      <tbody>
        {persons.map((person) => (
            <tr key={person.name}> 
              <td>{person.name}</td> 
              <td>{person.number}</td>
              <td><button onClick={() => dltBtn(person.id)}>Delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonsShow;