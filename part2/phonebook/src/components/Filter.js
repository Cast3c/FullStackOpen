import React from "react"

const Filter = ({ findPerson, handleFindPerson}) =>{
    return (
        <div>
            Filter:  <input  value={findPerson} onChange={handleFindPerson} />
        </div>
    )
}

export default Filter