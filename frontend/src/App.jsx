import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
export const BASE_URL = "http://16.171.17.159/todo"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  {/* a nav bar */}

    <Routes>
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
    
    </>
  )
}

export default App
