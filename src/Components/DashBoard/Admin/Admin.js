import React from 'react'
import NavBarComponent from '../../NavBar/NavBarComponent'
import './Admin.css'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import AdminNavBar from '../../NavBar/AdminNavBar'
import AdminHomeNav from '../../NavBar/AdminHomeNav'
class AdminHomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            flag: 0
        }
    }
    handleStudent = (e) => {
        this.setState({
            flag: 1
        })
    }
    handleFaculty = (e) => {
        this.setState({
            flag: 2
        })
    }
    handleSubject=(e)=>{
        this.setState({flag:3})
    }
    render() {
        if (this.state.flag === 1) {
            return (
                <Redirect to="/admin/adminAddStudent" />
            );
        }
        else if (this.state.flag === 2) {
            return (
                <Redirect to="/admin/adminAddFaculty" />
            );
        }else if(this.state.flag===3){
            return(
                <Redirect to= "/admin/adminAddSubject"/>
            )
        } 
        else {
            return (
                <div>
                    <AdminHomeNav />
                    <div className="admin-home-outer">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center" onClick={this.handleStudent}>
                                Add Student
                            <span class="badge badge-primary badge-pill">+</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center" onClick={this.handleFaculty}>
                                Add Faculty
                            <span class="badge badge-primary badge-pill">+</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center" onClick={this.handleSubject}>
                                Add Subject
                            <span class="badge badge-primary badge-pill">+</span>
                            </li>

                        </ul>
                    </div>

                </div>
            )
        }
    }
}
export default AdminHomePage;

