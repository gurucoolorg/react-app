import React from 'react'
import Axios from 'axios'
import { ListGroup, Card } from 'react-bootstrap'
import TeacherNavBar from '../../NavBar/TeacherNavBar'
import './DoubtSection.css'
import TeacherDoubtTopicNav from '../../NavBar/TeacherDoubtTopicNav'
class DoubtSection extends React.Component {
    constructor() {
        super()
        this.state = {
            combined:[],
            answer:''
        }
    }
    async componentDidMount() {
        console.log(this.props.id);
        try {
           // var lectId = this.props.match.params.id
           var lectId=this.props.id
            var url = `http://15.206.132.187:8080/${lectId}/doubt`
            await Axios.get(url)
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
    handleChange=(e)=>{
        console.log(e.target.value)
        this.setState({
            answer:e.target.value
        })
    }
    handleSubmit=(id,e)=>{
        console.log(this.state.answer)
        try{
           const requestOption={
               method:'POST',
               headers:{'Content-Type':'application/json'},
               body:JSON.stringify({
                   doubt_id:id,
                   answer:this.state.answer
               })
           };
           fetch('http://15.206.132.187:8080/doubt/set',requestOption) 
            .then(async response=>{
                console.log('debugg add doubt : ',response);
                
            })
            .catch(error=>{
                console.log('debugg add doubt error : ',error);

            })
            
        }catch(error){

        }
    }
    
    render() {
        return (
            <div>
                
                {/* {this.props.match.params.id} */}
                <div >
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
                                        {element[0] === null ? <div><input placeholder="Answer here" onChange={this.handleChange}/><button onClick={(e)=>{
                                            this.handleSubmit(element[1],e)
                                        }}>Submit</button></div> : <p>{element[0]}</p>}
                                    </Card>
                                </ListGroup.Item>
                            );
                        })}


                    </ListGroup>
                </div>
            </div>)
    }
}

export default DoubtSection;