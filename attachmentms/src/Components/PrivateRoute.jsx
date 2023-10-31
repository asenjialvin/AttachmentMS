// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
  return localStorage.getItem("valid") ? children : <Navigate to="/" />
}

export default PrivateRoute