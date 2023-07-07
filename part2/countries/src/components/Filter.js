import React from "react"

const Filter = ({ findCountry, handleFindCountry}) =>{
    return (
        <div>
            Filter:  <input  value={findCountry} onChange={handleFindCountry} />
        </div>
    )
}

export default Filter