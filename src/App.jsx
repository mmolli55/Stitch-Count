import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import IncrementValue from "./components/IncrementValue"
import Row from "./components/Row"

function App() {
  const [count, setCount] = useState(0)
  const [currentRow, setCurrentRow] = useState(1)
  const [allRows, setAllRows] = useState([])
  const [incrementAmount, setIncrementAmout] = useState(1)
  const [incrementOptions, setIncrementOptions] = useState([
    { id: 1, value: 1, selected: true}, 
    { id: 2, value: 2, selected: false}, 
    { id: 3, value: 3, selected: false}, 
    { id: 5, value: 5, selected: false}, 
    { id: 10, value: 10, selected: false}
  ])

  function increaseCount() {
    setCount(prevCount => prevCount + incrementAmount)
  }

  function decreaseCount() {
    setCount(prevCount => prevCount - incrementAmount)
  }

  function resetCount() {
    setCount(0)
  }

  function changeIncrementValue(event) {
    setIncrementAmout(Number(event.target.id))
  }

  function addNewRow(stitchCount) {
    setAllRows(prevRows => {
      return [...prevRows, {rowNumber: prevRows.length + 1, stitches: stitchCount}]
    })

    resetCount()
  }

  function deleteRow(rowNumber) {
    if (confirm("Are you sure you want to delete this row?")) {
      
      setAllRows(prevRows => prevRows.filter(row => rowNumber != row.rowNumber))
    }
  }

  useEffect(() => setIncrementOptions(prevOptions => prevOptions.map(option => {
    if (option.id === incrementAmount) {
      return {...option, selected: true}
    } else {
      return {...option, selected: false}
    }
  })), [incrementAmount])

  const incrementOptionElements = incrementOptions.map(option => {
    return (
      <IncrementValue 
        key={option.id}
        id={option.id}
        value={option.value}
        selected={option.selected}
        handleClick={changeIncrementValue}
      />
    )
  })

  const rowElements = allRows.map(row => {
    return (
      <Row 
        key={row.rowNumber}
        rowNumber={row.rowNumber}
        stitches={row.stitches}
        deleteRow={deleteRow}
      />
    )
  })

  return (
    <>
      <h1 className="title poetsen-one-regular">Stitch Count</h1>
      <p className="row-number-display">Row: {currentRow}</p>
      <div className="count-container">
        <span className="count-display">{count}</span>
      </div>

      <div className="button-container">
        <button onClick={decreaseCount} className="btn-minus">&ndash;</button>
        <div className="current-increment-value-display">{incrementAmount}</div>
        <button onClick={increaseCount} className="btn-plus">+</button>
      </div>

      <p className="increment-text">Select increment value:</p>

      <div className="increment-select-container">
        {incrementOptionElements}
      </div>

      <div className="new-row-btn-container">
          <button className="btn-new-row" onClick={() => addNewRow(count)}>Add New Row</button>
      </div>

      <div className="all-rows-container">
        {allRows.length > 0 &&<p className="all-rows-header">
          <span className="table-header">Row</span>
          <span className="table-header">Stich Count</span>
        </p>}
        {rowElements}
      </div>

    </>
  )
}

export default App
