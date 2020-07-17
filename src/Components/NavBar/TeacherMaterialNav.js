import React from 'react'
import { Redirect } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'


class TeacherMaterialNav extends React.Component {
    constructor(props) {
        super(props)
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
                <a class="navbar-brand" href='/teacherhome'>GuruCool</a>
                <dv className="breadcrumb">
                    <Breadcrumb >
                        <Breadcrumb.Item href='/teacherhome'>Home</Breadcrumb.Item>
                        <Breadcrumb.Item href='/teacher/att_doubts'>Subjects</Breadcrumb.Item>
                        <Breadcrumb.Item  href={`/teacher/topiclist/${this.props.id}/${this.props.name}`}>Topic List</Breadcrumb.Item>
                        <Breadcrumb.Item active href="#">Material & Doubts</Breadcrumb.Item>

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
                                <a class="nav-link" href="/teacherdashboard">Add Material</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="/teacher/att_doubts">Attendence & Doubts<span class="sr-only">(current)</span></a>
                            </li>

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

export default TeacherMaterialNav;