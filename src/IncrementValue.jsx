export default function IncrementValue(props) {
    const style = {
        backgroundColor: props.selected ? "#f5d2a6" : "#ededed",
        border: props.selected ? "3px solid #F28705" : "3px solid #404040"
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