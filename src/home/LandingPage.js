import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const LandingPage=()=>{
    return(
        <div>
            <Redirect to="/loggedIn" />
        </div>
    )
}