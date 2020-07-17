import React from 'react'
import { Redirect } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import './AdminAddStudNav.css'

class HODHomeScreenNav extends React.Component {
    constructor() {
        super()
        this.state = {
            log: true
        }
    }
    handleLogout = (e) => {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('user_type')
        localStorage.removeItem('full_name')
        localStorage.removeItem('user_id')

        this.setState({
            log: false
        })
    }
    render() {
        if (this.state.log === false) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">GuruCool</a>
                <dv className="breadcrumb">
                    <Breadcrumb >
                        <Breadcrumb.Item active href="#">Home</Breadcrumb.Item>

                    </Breadcrumb>
                </dv>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <ul class="navbar-nav mr-auto">

                           

                            <li class="nav-item">
                                <a class="nav-link" href="/logout" tabindex="-1" >Logout</a>
                            </li>
                        </ul>
                    </form>


                </div>
            </nav>
        )

    }
}

export default HODHomeScreenNav;