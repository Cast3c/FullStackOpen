import React from "react";

const FormNewPerson = ({ addPer, handleNewNam, newNam, newPhon, handleNewPhon }) => {
  return (
    <form onSubmit={addPer}>
      <div>
        name: <input value={newNam} onChange={handleNewNam} />
      </div>
      <div>
        phone: <input value={newPhon} onChange={handleNewPhon} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default FormNewPerson;
// Compare this snippet from fullStackOpen/part2/phonebook/src/components/Persons.js: