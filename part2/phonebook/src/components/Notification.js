import React from "react"

const Notification = ({ message, typeOf }) => {
    
    let styleClass = '';

    if( message === null && typeOf === null ){
        return null
    }else if (typeOf === 'success') {
        styleClass = 'success'
    }else if(typeOf === 'error'){
        styleClass = 'error'
    }

    return (
        <div className={`${styleClass}`}>
            {message}
        </div>
    )
}
export default Notification