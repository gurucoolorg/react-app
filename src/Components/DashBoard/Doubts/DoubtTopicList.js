import React from 'react'
import Axios from 'axios';
import { ListGroup, Card } from 'react-bootstrap';
import TeacherNavBar from '../../NavBar/TeacherNavBar';
import { Redirect } from 'react-router-dom';
import TeacherDoubtTopicNav from '../../NavBar/TeacherDoubtTopicNav';
import './DoubtTopicList.css'
class DoubtTopicList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lectureIdProp: '',
            topicNameProp: '',
            combined: [],
            flag: false

        }
    }
    async componentDidMount() {

        var subId = this.props.match.params.id;
        console.log('in topic :', subId)
        var url = `http://15.206.132.187:8080/${subId}/material/title`
        await Axios.get(url)
            .then((response) => {
                var a = [], b = [], c = [];
                response.data.map((data) => {
                    a.push(data['topic'])
                    b.push(data['lecture_id'])
                    c = a.map(function (e, i) {
                        return [e, b[i]];
                    });
                    this.setState({
                        combined: c
                    })

                })
            })
        console.log(this.state.combined)

    }
    handleClick = (element, count, e) => {

        this.setState({
            flag: true,
            topicNameProp: element,
            lectureIdProp: count,

        })
    }
    render() {
        if (this.state.flag === true) {
            //this.state.flag=false
            return (
                <Redirect to={`/teacher/topiclist/details/${this.state.lectureIdProp}/${this.state.topicNameProp}/${this.props.match.params.id}/${this.props.match.params.name}`} />
            )
        }
        var count=0
        return (<div>
            <TeacherDoubtTopicNav />
            <h2 className="text-center">{this.props.match.params.subName}</h2>
            <h3 className="text-center">Topic List</h3>
            <div className="doubt-topiclist">
                <ListGroup >
                    {this.state.combined.map((element) => {
                        return (
                            <ListGroup.Item className='doubt-topiclist-listitem'>
                                <Card className='doubt-topilist-card' onClick={(event) => { this.handleClick(element[0], element[1], event) }}>{count++}.   {element[0]}</Card>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </div>)
    }
}

export default DoubtTopicList;