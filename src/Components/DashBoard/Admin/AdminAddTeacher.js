
import React from 'react'
import NavBarComponent from '../../NavBar/NavBarComponent'
import './Admin.css'
import { Redirect } from 'react-router-dom'
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import AdminNavBar from '../../NavBar/AdminNavBar'
import AdminAddStudNav from '../../NavBar/AdminAddStudNav'
class AdminAddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            role:'Teacher',
            branch:'Computer Engineering',
            fullName: '',
            emailId: '',
            mobNo: ''
        }
    }
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }
    handleSelectBranch = (e) => {
        console.log(e);
        this.setState({
            branch: e
        })
    }
    handleSelectRole = (e) => {
        console.log(e);
        this.setState({
            role: e
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state.fullName,this.state.emailId,this.state.mobNo,this.state.role,this.state.branch)
        const requestOption={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                fullname:this.state.fullName,
                email_id:this.state.emailId,
                branch:this.state.branch,
                role:this.state.role,
                phone_no:this.state.mobNo
            })
        };
        fetch('http://15.206.132.187:8080/admin/add/teacher',requestOption)
            .then(async response=>{
                console.log('debugg add student',response)
                // window.location.reload(false);

            })
            .catch(error=>{
                console.log('debugg add student error',error);
                
            });
        this.setState({
            fullname:'',
            emailId:'',
            mobNo:''
        })
    }
    handleMob=(e) => {
        this.setState({
            mobNo: e.target.value
        })
    }
    handleEmail=(e) => {
        this.setState({
            emailId: e.target.value
        })
    }
    handleName=(e) => {
        
        this.setState({
            fullName: e.target.value
        })
    }
    render() {
       return (
            <div>
                <AdminAddStudNav/>
                <div className="add-student-outer">
                    <div class="card5">
                        <h3 className="text-center">Add Faculty</h3>
                        <div class="card-body">

                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <input type="text" class="form-control"  placeholder = "Full Name" onChange={this.handleName} />
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control"  placeholder="Email Id" onChange={this.handleEmail} />
                                </div>

                                <div class="form-group">
                                    <input type="tel" class="form-control"  placeholder="Mobile No" onChange={this.handleMob}  />
                                </div>

                                <Row>
                                    <Col>
                                        <label>Role</label>
                                        <DropdownButton
                                            
                                            title={this.state.role}
                                            id="dropdown-menu-align-right"
                                            onSelect={this.handleSelectRole}
                                        >
                                            <Dropdown.Item eventKey="HOD">HOD</Dropdown.Item>
                                            <Dropdown.Item eventKey="Teacher">Teacher</Dropdown.Item>

                                        </DropdownButton>

                                    </Col>
                                    <Col>
                                        <label>Branch</label>
                                        <DropdownButton
                                            title={this.state.branch}
                                            id="dropdown-menu-align-right"
                                            onSelect={this.handleSelectBranch}
                                        >   
                                            <Dropdown.Item eventKey="FE">First Year</Dropdown.Item>
                                            <Dropdown.Item eventKey="Computer Engineering">Computer Engineering</Dropdown.Item>
                                            <Dropdown.Item eventKey="Electronics Engineering">Electronics Engineering</Dropdown.Item>
                                            <Dropdown.Item eventKey="Mechanical Engineering">Mechanical Engineering</Dropdown.Item>

                                            <Dropdown.Item eventKey="Civil Engineering">Civil Engineering</Dropdown.Item>
                                        </DropdownButton>

                                    </Col>
                                </Row>
                                <div class="form-group row">
                                    <div class="col-sm-10 offset-sm-3">
                                        <button type="submit" class="btn btn-secondary">Add Faculty</button>
                                    </div>
                                </div>


                            </form>


                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default AdminAddTeacher;