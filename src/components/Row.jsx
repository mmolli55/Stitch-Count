export default function Row(props) {
    return (
        <p className="row">
            <span className="table-value">{props.rowNumber}</span>
            <span className="table-value">{props.stitches}</span>
            <span className="delete-row-icon" onClick={() => props.deleteRow(props.rowNumber)}>X</span>
        </p>
    )
}