import React from 'react'
import TeacherNavBar from '../../NavBar/TeacherNavBar';
import { Card, Accordion, Button, Table } from 'react-bootstrap'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import HODNavBar from './HODNavBar';
import HODHomeScreenNav from '../../NavBar/HODNavBar';
class HODHomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            combined: [],
            teachers_name: '',
            subject_id: '',
            flag: false,
            branch_name: ''
        }
    }

    handleYearFE = (year, event) => {
        //var branch = this.props.match.params.branch;
        var url = `http://15.206.132.187:8080/FE/${year}/HOD/subject/list`
        try {
            Axios.get(url)
                .then((response) => {
                    var a = [], b = [], c = [], d = [];
                    response.data.map((data) => {
                        a.push(data['subject_id'])
                        b.push(data['subject_name'])
                        c.push(data['teacher_name'])
                        d = a.map(function (e, i) {
                            return [e, b[i], c[i]];
                        });
                        this.setState({
                            combined: d
                        })

                    })
                })
            console.log(this.state.combined)
        }
        catch (error) {
            alert(error.message)
        }

    }
    handleYear = (year, event) => {
        var branch = this.props.match.params.branch;
        var url = `http://15.206.132.187:8080/${year}/${branch}/HOD/subject/list`
        try {
            Axios.get(url)
                .then((response) => {
                    var a = [], b = [], c = [], d = [];
                    response.data.map((data) => {
                        a.push(data['subject_id'])
                        b.push(data['subject_name'])
                        c.push(data['teacher_name'])
                        d = a.map(function (e, i) {
                            return [e, b[i], c[i]];
                        });
                        this.setState({
                            combined: d
                        })

                    })
                })
            console.log(this.state.combined)
        }
        catch (error) {
            alert(error.message)
        }

    }
    handleEditTeacher = (sub_id, teacher_name, e) => {
        //console.log(sub_id,teacher_name)
        this.setState({
            subject_id: sub_id,
            teachers_name: teacher_name,
            branch_name: this.props.match.params.branch,
            flag: true
        })
        console.log(this.state.subject_id, this.state.teachers_name);

    }
    

    render() {
        if (this.state.flag === true) {
            return (
                <Redirect to={`/hod/editTeacher/${this.state.subject_id}/${this.state.teachers_name}/${this.state.branch_name}`} />
            )
        }
        var count = 1
        return (
            <div>
                {/* <HODNavBar branch={this.props.match.params.branch} /> */}
                <HODHomeScreenNav />
                HOD Home Screen
                <h2>{this.props.match.params.branch}</h2>
                <div>
                    {this.props.match.params.branch === "FE" ?
                        <Accordion defaultActiveKey="-1">

                            <Card>

                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={(e) => { this.handleYearFE('A', e) }}>
                                        A
                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>

                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={(e) => { this.handleYearFE('B', e) }}>
                                        B
                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>

                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2" onClick={(e) => { this.handleYearFE('C', e) }}>
                                        C
                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>

                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3" onClick={(e) => { this.handleYearFE('D', e) }}>
                                        D
                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion> : <Accordion defaultActiveKey="-1"> <Card>

                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={(e) => { this.handleYear('SE', e) }}>
                                    SE
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Index</th>
                                                <th>Subject Name</th>
                                                <th>Teacher Name</th>

                                            </tr>
                                        </thead>
                                        {this.state.combined.map((element) => {

                                            return (

                                                <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                    <tr>
                                                        <td>{count++}</td>
                                                        <td>{element[1]}</td>
                                                        <td>{element[2]}</td>

                                                    </tr>

                                                </tbody>

                                            )
                                        })}
                                    </Table>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={(e) => { this.handleYear('TE', e) }}>
                                        TE
                            </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2" onClick={(e) => { this.handleYear('BE', e) }}>
                                        BE
                            </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Subject Name</th>
                                                    <th>Teacher Name</th>

                                                </tr>
                                            </thead>
                                            {this.state.combined.map((element) => {

                                                return (

                                                    <tbody onClick={(e) => { this.handleEditTeacher(element[0], element[2], e) }}>
                                                        <tr>
                                                            <td>{count++}</td>
                                                            <td>{element[1]}</td>
                                                            <td>{element[2]}</td>

                                                        </tr>

                                                    </tbody>

                                                )
                                            })}
                                        </Table>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                        </Accordion>}
                </div>

            </div >
        )
    }
}

export default HODHomeScreen;