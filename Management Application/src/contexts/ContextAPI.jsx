import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext()

const ContextAPI = ({children}) => {
    const [token,setToken]=useState(true)
   useEffect(()=>{
    if(sessionStorage.getItem('token')){
        setToken(true)
    }else{
        setToken(false)
    }
   },[token])
  return (
    <AuthContext.Provider value={{token,setToken}}>
        {children}
    </AuthContext.Provider>
  )
}

export default ContextAPI
