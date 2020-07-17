import React from 'react'
import TeacherNavBar from '../../NavBar/TeacherNavBar';
import Axios from 'axios';
import { Row, Col, Card, Accordion, Button, ListGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import TeacherMaterialNav from '../../NavBar/TeacherMaterialNav';
import './ActualMaterial.css'
import DoubtSection from './DoubtSection';
class ActualMaterial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resourceUrl: [],
            topic: '',
            videoUrl: '',
            lectureId: '',
            combined: [],
            answer: '',
            attendance_url:''
        }

    }
    async componentDidMount() {
        var lectId = this.props.match.params.id;
        var userId = localStorage.getItem('user_id')

        this.setState({
            lectureId: lectId
        })
        console.log(this.state.lectureId);
        var url = `http://15.206.132.187:8080/${userId}/${lectId}/material/actual`
        await Axios.get(url)
            .then((response) => {
                console.log(response.data)
                this.setState(prevState => ({
                    resourceUrl: [...prevState.resourceUrl, response.data['resource_url']],
                    topic: response.data['topic'],
                    videoUrl: response.data['video_url'],
                    attendance_url:response.data['attendance_url']

                })
                )
            })
    }
    handleClick = (e) => {
        this.setState({
            flag: true
        })
    }
    fetchComments = (e) => {
        try {
            // var lectId = this.props.match.params.id
            var lectId = this.state.lectureId
            var url = `http://15.206.132.187:8080/${lectId}/doubt`
            Axios.get(url)
                .then((response) => {
                    var a = [], b = [], c = [], d = [], e = []
                    response.data.map((data) => {
                        a.push(data['answer'])
                        b.push(data['doubt_id'])
                        c.push(data['full_name'])
                        d.push(data['question'])
                        e = a.map(function (event, i) {
                            return [event, b[i], c[i], d[i]];
                        })
                        this.setState({ combined: e })
                    })
                    console.log(this.state.combined)

                })
        } catch (error) {
            alert(error.message)
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            answer: e.target.value
        })
    }
    handleSubmit = (id, e) => {
        console.log(this.state.answer)
        try {
            const requestOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doubt_id: id,
                    answer: this.state.answer
                })
            };
            fetch('http://15.206.132.187:8080/doubt/set', requestOption)
                .then(async response => {
                    console.log('debugg add doubt : ', response);

                })
                .catch(error => {
                    console.log('debugg add doubt error : ', error);

                })

        } catch (error) {

        }
    }
    render() {
        if (this.state.flag === true) {
            return (
                <div>
                    <Redirect to={`/material/doubt/${this.state.lectureId}`} />
                </div>
            )
        }
        return (
            <div >
                <TeacherMaterialNav id={this.props.match.params.subId} name={this.props.match.params.subName} />
                <h2 className="text-center">{this.props.match.params.name}</h2>
                <div className="actual-material-outer-div">
                    <Card className="card6">
                        <Card className="am-info-card">
                            <Row className="am-info-row">

                                <Col><b><big>Topic Name:</big></b></Col>
                                <Col>{this.state.topic}</Col>

                            </Row>
                        </Card>
                        <Card className="am-info-card">
                            <Row>
                                <Col><b><big>Video Url</big></b></Col>
                                <Col><a href={this.state.videoUrl}>{this.state.videoUrl}</a></Col>

                            </Row>
                        </Card>
                        <Card className="am-info-card">
                            <Row>
                                <Col><b><big>Attendence</big></b></Col>
                                <Col><a href={this.state.attendance_url}>{this.state.attendance_url}</a></Col>

                            </Row>
                        </Card>
                        <Card className="am-info-card">
                            <Row>
                                <Col><b><big>Resource Urls</big></b></Col>
                                {this.state.resourceUrl.map((element) => {
                                    return (<Col><a href={element}>{element}</a></Col>)
                                })}

                            </Row>
                        </Card>
                        {/* <Row>
                            <button onClick={this.handleClick}>Doubts</button>
                        </Row> */}
                        <Card className="am-info-card">
                            <Row >
                                <Accordion className="am-doubt-accordian"defaultActiveKey="0">
                                    <Card className="am-doubt-card">
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} onClick={this.fetchComments} variant="#" eventKey="1">
                                                Doubts
                                    </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <ListGroup>
                                                    {this.state.combined.map((element) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                <Card className="doubt-section-card">
                                                                    <h5>{element[2]}</h5>
                                                                    <p>{element[3]}</p>
                                                                </Card>
                                                                <Card className="doubt-section-card2">
                                                                    Answer
                                                                {element[0] === null ? <div><input placeholder="Answer here" onChange={this.handleChange} /><button onClick={(e) => {
                                                                        this.handleSubmit(element[1], e)
                                                                    }}>Submit</button></div> : <p>{element[0]}</p>}
                                                                </Card>
                                                            </ListGroup.Item>
                                                        );
                                                    })}


                                                </ListGroup>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Row>
                        </Card>
                    </Card>
                </div>
            </div>
        )
    }
}

export default ActualMaterial;