import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import IncrementValue from "./IncrementValue"

function App() {
  const [count, setCount] = useState(0)
  const [incrementAmount, setIncrementAmout] = useState(1)
  const [incrementOptions, setIncrementOptions] = useState([
    {
      id: 1,
      value: 1,
      selected: true
    }, 
    {
      id: 2,
      value: 2,
      selected: false
    }, 
    {
      id: 3,
      value: 3,
      selected: false
    }, 
    {
      id: 5,
      value: 5,
      selected: false
    }, 
    {
      id: 10,
      value: 10,
      selected: false
    }
  ])


  /* THIS NEEDS FIXED */
  function changeIncrementValue(event) {
    setIncrementOptions(prevOptions => prevOptions.map(option => {
      if(event.target.id === option.id) {
        return {...option, selected: !option.selected}
      } else {
        return {...option}
      }
    }))
  }

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

  useEffect(function() {
    const minusBtn = document.querySelector(".btn-minus")
    const plusBtn = document.querySelector(".btn-plus")

    minusBtn.addEventListener("click", function() {
      setCount(prevValue => prevValue - incrementAmount)
    })

    plusBtn.addEventListener("click", function() {
      setCount(prevValue => prevValue + incrementAmount)
    })
  }, [])

  return (
    <>
      <h1 className="title poetsen-one-regular">Stitch Count</h1>

      <div className="count-container">
        <span className="count-display">{count}</span>
      </div>

      <div className="button-container">
        <button className="btn-minus">&ndash;</button>
        <div className="current-increment-value-display">{incrementAmount}</div>
        <button className="btn-plus">+</button>
      </div>

      <p className="increment-text">Select increment value:</p>

      <div className="increment-select-container">
        {incrementOptionElements}
      </div>

    </>
  )
}

export default App
