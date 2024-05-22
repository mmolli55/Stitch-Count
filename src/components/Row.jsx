export default function Row(props) {
    return (
        <p className="row"><span class="table-value">{props.rowNumber}</span><span class="table-value">{props.stitches}</span></p>
    )
}