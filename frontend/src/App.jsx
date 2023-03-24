import React from 'react'
import {Routes,Route} from "react-router-dom"
import Register from './pages/Register'
import Users from './pages/Users'
import Singleuser from './pages/Singleuser'
import Updateuser from './pages/Updateuser'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Users/>}/>
        <Route path='/user/:id' element={<Singleuser/>}/>
        <Route path='/update/:id' element={<Updateuser/>}/>
      </Routes>
    </div>
  )
}

export default App