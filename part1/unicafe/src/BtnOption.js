const BtnOption = (props) =>{
    return (
        <button onClick={props.handleClick}>{props.option}</button>
    )
}

export default BtnOption