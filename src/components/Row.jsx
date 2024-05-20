export default function Row(props) {
    const style = {
        borderBottom: "3px solid #F272A1"
    }
    return (
        <p className="row" style={style}><span>{props.rowNumber}</span><span>{props.stitches}</span></p>
    )
}