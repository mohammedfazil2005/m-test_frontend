import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

// Component Imports
import Login from './components/Login'
import OTP from './components/OTP'
import Home from './components/Home'
import PNF from './components/PNF'
import FlowEditor from './components/FlowEditor'

// Context Import
import { AuthContext } from './contexts/ContextAPI'

// Toast Notifications
import { Toaster } from 'react-hot-toast'

const App = () => {
  // Get token from AuthContext to check authentication status
  const { token } = useContext(AuthContext)

  return (
    <>
      {/* Toast notification wrapper */}
      <Toaster />

      {/* Application Routes */}
      <Routes>
        {/* If token exists, show Home, else redirect to Login */}
        <Route path='/' element={token ? <Home /> : <Login />} />

        {/* OTP route (accessible after registration) */}
        <Route path='/otp' element={<OTP />} />

        {/* Protected Flowchart route – requires token */}
        <Route path='/flowchart' element={token ? <FlowEditor /> : <Login />} />

        {/* Page Not Found route for all other paths */}
        <Route path='/*' element={<PNF />} />
      </Routes>
    </>
  )
}

export default App
