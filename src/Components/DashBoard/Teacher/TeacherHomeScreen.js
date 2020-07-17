import React from 'react'
import NavBarComponent from '../../NavBar/NavBarComponent'
import './TeacherHomeScreen.css'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import AdminNavBar from '../../NavBar/AdminNavBar'
import TeacherNavBar from '../../NavBar/TeacherNavBar'
class TeacherHomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            flag: 0
        }
    }
    
    handleMaterial = (e) => {
        this.setState({
            flag: 1
        })
    }
    handleAttendence=(e)=>{
        this.setState({flag:2})
    }
    render() {
        if (this.state.flag === 1) {
            return (
                <Redirect to="/teacherdashboard" />
            );
        }
        else if (this.state.flag === 2) {
            return (
                <Redirect to="/teacher/att_doubts" />
            );
        } 
        else {
            return (
                <div>
                    <TeacherNavBar />
                    <div className="admin-home-outer">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center" onClick={this.handleMaterial}>
                                Add Material
                            <span class="badge badge-primary badge-pill">+</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center" onClick={this.handleAttendence}>
                                Attendence and Doubts
                            <span class="badge badge-primary badge-pill">+</span>
                            </li>
                            

                        </ul>
                    </div>

                </div>
            )
        }
    }
}
export default TeacherHomeScreen;

