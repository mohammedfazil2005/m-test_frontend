import React, { useContext } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import OTP from './components/OTP'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home'
import { AuthContext } from './contexts/ContextAPI'
import PNF from './components/PNF'
import FlowChart from './components/FlowEditor'
import FlowEditor from './components/FlowEditor'



const App = () => {
  const {token} =useContext(AuthContext)


  return (
   <>
   <Toaster/>
   <Routes>
    <Route path='/' element={token?<Home/>:<Login/>} />
    <Route path='/otp' element={<OTP/>}/>
    <Route path='/flowchart' element={token?<FlowEditor/>:<Login/>}/>
    <Route path='/*' element={<PNF/>}/>
   </Routes>
   </>
  )
}

export default App
