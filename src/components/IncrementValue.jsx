export default function IncrementValue(props) {
    const style = {
        backgroundColor: props.selected ? "#F299B1" : "#ededed",
        border: props.selected ? "3px solid #F272A1" : "3px solid #404040"
    }
    return (
        <button 
            onClick={props.handleClick} 
            className="btn-increment-value"
            style={style}
            id={props.id}
        >{props.value}</button>
    )
}