import React from 'react'
import NavBarComponent from '../../NavBar/NavBarComponent'
import './Admin.css'
import { Redirect } from 'react-router-dom'
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import AdminNavBar from '../../NavBar/AdminNavBar'
import AdminAddStudNav from '../../NavBar/AdminAddStudNav'
class AdminAddStudents extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            emailId: '',
            mobNo: '',
            rollNo: '',
            yearOption: 'First Year',
            isOpenYear: false,
            isOpenBranch: false,
            year: 'FE',
            branch: 'A',

        }
    }
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }
    handleSelect = (e) => {
        if (e === 'FE') {
            this.setState({
                year: 'FE',
            })
        } else {
            this.setState({
                year: 'SE',
                branch: 'Computer Engineering'
            })
        }
        this.setState({
            yearOption: e
        })
    }
    handleSelectBranch = (e) => {
        console.log(e);
        this.setState({
            branch: e
        })
    }
    handleSelectYear = (e) => {
        console.log(e);
        this.setState({
            year: e
        })
    }
    handleChangeName = (e) => {
        this.setState({
            fullName: e.target.value
        })
    }
    handleChangeEmail = (e) => {
        this.setState({
            emailId: e.target.value
        })
    }
    handleChangeRoll = (e) => {
        this.setState({
            rollNo: e.target.value
        })
    }
    handleChangeMob = (e) => {
        this.setState({
            mobNo: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.fullName, this.state.emailId, this.state.mobNo, this.state.rollNo, this.state.year, this.state.branch)

        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullname: this.state.fullName,
                roll_no: this.state.rollNo,
                email_id: this.state.emailId,
                year: this.state.year,
                branch: this.state.branch,
                phone_no: this.state.mobNo
            })
        };
        fetch('http://15.206.132.187:8080/admin/add/student', requestOption)
            .then(async response => {
                console.log('debugg add student', response)
                window.location.reload(false);

            })
            .catch(error => {
                console.log('debugg add student error', error);

            });


    }
    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

        return (
            <div>
                <AdminAddStudNav />
                <div className="add-student-outer">
                    <div class="card5">
                        <h3 className="text-center">Add Student</h3>

                        <div class="card-body">
                            <label>Select Year</label>
                            <DropdownButton
                                title={this.state.yearOption}
                                id="dropdown-menu-align-right"
                                onSelect={this.handleSelect}
                            >
                                <Dropdown.Item eventKey="FE">First Year</Dropdown.Item>
                                <Dropdown.Item eventKey="Other than First">Other than First</Dropdown.Item>

                            </DropdownButton>


                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Full Name" onChange={this.handleChangeName} />
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" id="formGroupExampleInput2" placeholder="Email Id" onChange={this.handleChangeEmail} />
                                </div>
                                <Row>
                                    <Col>
                                        <div class="form-group">
                                            <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Roll No" onChange={this.handleChangeRoll} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="form-group">
                                            <input type="telephone" class="form-control" id="formGroupExampleInput2" placeholder="Mobile No" onChange={this.handleChangeMob} />
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <label>Year</label>
                                        <DropdownButton
                                            title={this.state.year}
                                            id="dropdown-menu-align-right"
                                            onSelect={this.handleSelectYear}
                                        >   <Dropdown.Item eventKey="FE" disabled="true">First Year</Dropdown.Item>

                                            {this.state.yearOption === 'Other than First' ? <Dropdown.Item eventKey="SE">Second Year</Dropdown.Item> : <Dropdown.Item eventKey="SE" disabled="true">Second Year</Dropdown.Item>}
                                            {this.state.yearOption === 'Other than First' ? <Dropdown.Item eventKey="TE">Third Year</Dropdown.Item> : <Dropdown.Item eventKey="TE" disabled="true">Third Year</Dropdown.Item>}
                                            {this.state.yearOption === 'Other than First' ? <Dropdown.Item eventKey="BE">Fourth Year</Dropdown.Item> : <Dropdown.Item eventKey="BE" disabled="true">Fourth Year</Dropdown.Item>}

                                        </DropdownButton>

                                    </Col>
                                    <Col>
                                        <label>Branch</label>
                                        <DropdownButton
                                            alignCenter
                                            title={this.state.branch}
                                            id="dropdown-menu-align-right"
                                            onSelect={this.handleSelectBranch}
                                        >
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="Computer Engineering" disabled="true">Computer Engineering</Dropdown.Item> : <Dropdown.Item eventKey="Computer Engineering" >Computer Engineering</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="Electronics Engineering" disabled="true">Electronics Engineering</Dropdown.Item> : <Dropdown.Item eventKey="Electronics Engineering"> Electronics Engineering</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="Mechanical Engineering" disabled="true">Mechanical Engineering</Dropdown.Item> : <Dropdown.Item eventKey="Mechanical Engineering" >Mechanical Engineering</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="Civil Engineering" disabled="true">Civil Engineering</Dropdown.Item> : <Dropdown.Item eventKey="Civil Engineering" >Civil Engineering</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="A" >A</Dropdown.Item> : <Dropdown.Item eventKey="A" disabled="true" >A</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="B" >B</Dropdown.Item> : <Dropdown.Item eventKey="A" disabled="true" >B</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="C" >C</Dropdown.Item> : <Dropdown.Item eventKey="A" disabled="true" >C</Dropdown.Item>}
                                            {this.state.yearOption === 'FE' ? <Dropdown.Item eventKey="D" >D</Dropdown.Item> : <Dropdown.Item eventKey="A" disabled="true" >D</Dropdown.Item>}


                                        </DropdownButton>
                                    </Col>
                                </Row>
                                <div class="form-group row">
                                    <div class="col-sm-10 offset-sm-3">
                                        <button type="submit" class="btn btn-secondary">Add Student</button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default AdminAddStudents;