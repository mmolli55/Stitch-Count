import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import IncrementValue from "./components/IncrementValue"
import Row from "./components/Row"

function App() {
  
  const [project, setProject] = useState(
    () => JSON.parse(localStorage.getItem("project")) 
      || {currentCount: 0, currentRow: 1, allRows: [], currentIncrement: 1}
  )

  const [incrementOptions, setIncrementOptions] = useState([
    { id: 1, value: 1, selected: true}, 
    { id: 2, value: 2, selected: false}, 
    { id: 3, value: 3, selected: false}, 
    { id: 5, value: 5, selected: false}, 
    { id: 10, value: 10, selected: false}
  ])

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(project))
  }, [project])

  function increaseCount() {
    setProject(prevProject => {
      return {...prevProject,
        currentCount: prevProject.currentCount + prevProject.currentIncrement
      }
    })
  }

  function decreaseCount() {
    setProject(prevProject => {
      return {...prevProject,
        currentCount: prevProject.currentCount - prevProject.currentIncrement
      }
    })
  }

  function resetCount() {
    setProject(prevProject => {
      return {...prevProject, currentCount: 0}
    })
  }

  function changeIncrementValue(event) {
    setProject(prevProject => {
      return {...prevProject, currentIncrement: Number(event.target.id)}
    })
  }

  function addNewRow(stitchCount) {
    setProject(prevProject => {
      return {...prevProject,
        allRows: [...prevProject.allRows, {rowNumber: prevProject.allRows.length + 1, stitches: stitchCount}],
        currentRow: prevProject.currentRow + 1
      }
    })
    resetCount()
  }

  function deleteRow(rowNumber) {
    if (confirm("Are you sure you want to delete this row?")) {

      setProject(prevProject => {
        const remainingRows = prevProject.allRows.filter(row => rowNumber != row.rowNumber)
        const updatedNumberRows = []

        remainingRows.map(row => {
          updatedNumberRows.push({rowNumber: updatedNumberRows.length + 1, stitches: row.stitches})
        })

        return {...prevProject,
          allRows: updatedNumberRows,
          currentRow: prevProject.currentRow - 1
        }
      })
    }
  }

  useEffect(() => setIncrementOptions(prevOptions => prevOptions.map(option => {
    if (option.id === project.currentIncrement) {
      return {...option, selected: true}
    } else {
      return {...option, selected: false}
    }
  })), [project.currentIncrement])

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

  const rowElements = project.allRows.map(row => {
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

      <div id="labels-container">
        <p className="label">Row</p>
        <p className="label">Stitches</p>
      </div>
      
      <div id="counts-container">
        <div className="count-container">
          <span id="current-row-display">{project.currentRow}</span>
        </div>
        
        <div className="count-container">
          <span id="current-stitch-display">{project.currentCount}</span>
        </div>
      </div>

      <div className="button-container">
        <button onClick={decreaseCount} className="btn-minus">&ndash;</button>
        <div className="current-increment-value-display">{project.currentIncrement}</div>
        <button onClick={increaseCount} className="btn-plus">+</button>
      </div>

      <p className="increment-text">Select increment value:</p>

      <div className="increment-select-container">
        {incrementOptionElements}
      </div>

      <div className="new-row-btn-container">
        <button className="btn-new-row" onClick={() => addNewRow(project.currentCount)}>Add New Row</button>
      </div>

      <div className="all-rows-container">
        <p className="all-rows-header">
          <span className="table-header">Row</span>
          <span className="table-header">Stich Count</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </p>
        {rowElements}
      </div>
    </>
  )
}

export default App
