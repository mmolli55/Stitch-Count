import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(function() {
    const minusBtn = document.querySelector(".btn-minus")
    const plusBtn = document.querySelector(".btn-plus")

    minusBtn.addEventListener("click", function() {
      setCount(prevValue => prevValue - 1)
    })

    plusBtn.addEventListener("click", function() {
      setCount(prevValue => prevValue + 1)
    })
  }, [])
  

  return (
    <>
      <h1 className="title">Stitch Count</h1>
      <div>
        <button className="btn-minus">-</button>
        <span className="count-display">{count}</span>
        <button className="btn-plus">+</button>
      </div>
    </>
  )
}

export default App
