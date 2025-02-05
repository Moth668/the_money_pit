import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
// import bunkerPig from './assets/bunker-pig.png'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
          {/* <img src={bunkerPig} alt="The Money Pit logo" /> */}
        
      </div>
      <h1>The Money Pit 💰</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
