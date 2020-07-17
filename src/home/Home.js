import React from 'react'
import { Redirect, Route } from 'react-router-dom'

 class App extends React.Component {
    constructor() {
        super();
        this.state = {
            flag: 0,
        }
    }
   
    
    render(){
        if(localStorage.getItem('loggedIn')==='success' && localStorage.getItem('user_type')===1){
            return(
                <Redirect to="/teacherhome"/>
            )
        }else if(localStorage.getItem('loggedIn')==='success' && localStorage.getItem('user_type')===0){
            return(
                <div>
                    <Redirect to="/admin"/>
                </div>
            )
        }else if(localStorage.getItem('loggedIn')==='success' && localStorage.getItem('user_type')===2){
            return(
                <div>
                    <Redirect to="/hodhome"/>
                </div>
            )
        }
        else{
            return(
                <Redirect to="/login"/>
            )
        }
    
    }

}
export default App;