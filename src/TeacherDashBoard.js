import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import './TeacherDashBoard.css'
import ListGroup from 'react-bootstrap/ListGroup'
import NavBarGeneral from './NavBar'
class TeacherDashBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            subjects: ['CN', 'DBMS', 'TOC']
        }
    }
    render() {
        return (
            <div>
                <NavBarGeneral/>
                <div className="teacher-outer-div">

                    <ListGroup className="teacher-sub-list">
                        {this.state.subjects.map((e) => {
                            return (
                                <ListGroup.Item className="teacher-lg-item">

                                    <Card className="teacher-card-list">{e}</Card>
                                </ListGroup.Item>
                            )
                        })}


                    </ListGroup>

                </div>
            </div>
        );
    }
}

export default TeacherDashBoard;