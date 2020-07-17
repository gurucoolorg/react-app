import React from 'react'
import AdminNavBar from '../../NavBar/AdminNavBar'
import { Card } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import TeacherNavBar from '../../NavBar/TeacherNavBar'
import TeacherSubNavBar from '../../NavBar/TeacherSubNavBar'


function ErrorDisplay(props) {
    return <h5>{props.error}</h5>;
}


class DoubtSubList extends React.Component {
    constructor() {
        super()
        this.state = {
            loader: false,
            subjects: ['CN', 'TOC'],
            sub_id: [4, 5],
            combined: [],
            flag: false,
            error: false,
            errorMsg: ''
        }
    }

    async componentDidMount() {
        console.log('In subject list ---^^')
        /* if (this.props.history.action === "POP") {
            // custom back button implementation
            alert('cant go back , logoutthen')
        } */
        var userId = localStorage.getItem('user_id')
        console.log(userId, '---------storage-----');
        try {
            var url = `http://15.206.132.187:8080/${userId}/subject`
            await Axios.get(url)
                .then((response) => {
                    this.setState({ loader: true })
                    console.log(response.data);
                    var a = [], b = [], c = [];

                    response.data.map((data) => {
                        a.push(data['subject_name'])
                        b.push(data['subject_id'])
                        var c = a.map(function (e, i) {
                            return [e, b[i]];
                        });
                        this.setState(prevState => ({
                            subjects: [...prevState.subjects, data['subject_name']],
                            sub_id: [...prevState.sub_id, data['subject_id']],
                            combined: c
                        }))
                        // this.state.subjects.push(data['subject_name']);
                    });
                    /* var c = a.map(function (e, i) {
                        return [e, b[i]];
                    }); */

                    console.log(this.state.combined)
                })
        } catch (error) {
            console.log(error.message);
            console.log(error);
            
            
            this.setState({ error: true, errorMsg: error.message })
        }



    }
    handleSubmit = (element, count, e) => {

        this.setState({
            flag: true,
            sub_id_prop: count,
            sub_name_prop: element
        })
    }
    render() {
        if (this.state.flag === true) {
            //this.state.flag=false
            return (
                <Redirect to={`/teacher/topiclist/${this.state.sub_id_prop}/${this.state.sub_name_prop}`} />
            )
        }
        return (<div>
            <TeacherSubNavBar />
            <div className="teacher-outer-div">
                {/* {this.state.loader? <div>{this.state.subjects[0]}</div>:<Loader/>} */}
                <h3 className="tds-heading">ATTENDENCE </h3>
                {this.state.error===false ? <ListGroup className="teacher-sub-list">
                    {this.state.combined.map((element) => {

                        return (
                            <ListGroup.Item className="teacher-lg-item">

                                <Card className="teacher-card-list" onClick={(event) => {
                                    this.handleSubmit(element[0], element[1], event)
                                }} >{element[0]}</Card>
                                {/* <Card className="teacher-card-list" onClick={this.handleSubmit} >{this.state.count}</Card> */}

                            </ListGroup.Item>
                        )

                    })}


                </ListGroup> : <ErrorDisplay error={this.state.errorMsg} />}

            </div>
        </div>)
    }
}

export default DoubtSubList;