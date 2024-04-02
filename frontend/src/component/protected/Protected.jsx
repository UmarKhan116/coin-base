import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({isAuth, children}) {
    debugger
    if(isAuth){
        return children
    }else{
        return (<Navigate to="/login"/>)
    }
 
}

export default Protected