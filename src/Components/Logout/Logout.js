import React from 'react'
import { Redirect } from 'react-router-dom'
import Loader from '../Loader/Loader'

class Logout extends React.Component{
    constructor(){
        super()
        this.state={flag:false}
    }
    logout(){
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('user_type')
        localStorage.removeItem('full_name')
        localStorage.removeItem('user_id')
        this.setState({
            flag:!this.state.flag
        })
        console.log(localStorage.getItem('user_id'))
        return true;
    }
    render(){
        return(
            <div>
                {this.logout}?<Redirect to="/login"/>:<Loader/>
            </div>
        )
    }
}

export default Logout;