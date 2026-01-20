
import './App.css'
import { Route,Routes } from 'react-router-dom'

import Home from './components/Home'
import Moviedetail from './components/Moviedetail'

function App() {

  return (
    <>

    
    <Routes>
      <Route path="/"  element={<Home  />}   />

      <Route path='/movie/:id'  element={<Moviedetail  />} />
      
    </Routes >




      
    </>
  )
}

export default App
