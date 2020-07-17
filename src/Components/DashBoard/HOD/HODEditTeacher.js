import React from 'react'
import TeacherNavBar from '../../NavBar/TeacherNavBar';
import Axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import HODNavBar from '../../NavBar/HODEditNav';
import './HODEditTeacher.css'
class HODEditTeacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher_name: '',
            teachers: [],
            selected_teacher: 'Assign Teacher',
            flag: false
        }

    }
    async componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
        var branch = this.props.match.params.branch
        var url = `http://15.206.132.187:8080/${branch}/HOD/teacher/list`

        await Axios.get(url)
            .then((response) => {
                response.data.map((data) => {
                    this.setState(prevState => ({
                        teachers: [...prevState.teachers, data]
                    }))
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        console.log(this.state.teachers)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.teacher_name)
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject_id: this.props.match.params.sub_id,
                teacher_name: this.state.selected_teacher
            })
        };
        fetch('http://15.206.132.187:8080/HOD/update/teacher', requestOption)
            .then(async response => {
                console.log('debugg hod edit teacher', response)
                this.setState({
                    flag: true
                })
            })
            .catch(error => {
                console.log('debugg hod edit teacher error', error);

            });

    }
    handleSelect = (e) => {
        this.setState({
            selected_teacher: e
        })
    }
    render() {
        if (this.state.flag === true) {
            return (<Redirect to={`/hodhome/${this.props.match.params.branch}`} />)
        }
        return (<div>
            <HODNavBar branch={this.props.match.params.branch} />
            {/* {this.props.match.params.sub_id}:{this.props.match.params.teacher_name} */}

            <div className="hod-edit-div"> 
                <form className='hod-edit-form'>
                    <DropdownButton
                        title={this.state.selected_teacher}
                        id="dropdown-menu-align-right"
                        onSelect={this.handleSelect}

                    >
                        {this.state.teachers.map((element) => {
                            return (
                                <Dropdown.Item eventKey={element}>{element}</Dropdown.Item>
                            )
                        })}

                    </DropdownButton>
                    <div class="hod-edit-button">
                        <div class="col-sm-10 offset-sm-3">
                            <button type="submit" class="btn btn-secondary" onClick={this.handleSubmit}>Assign Teacher</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
    }

}

export default HODEditTeacher;