import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap';
import './UserLogin.css'
class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            flag: "0",
            resp: "",
            errorMsg: "",
            full_name: "",
            user_id: 0,
            user_type: 5,
            branch:''
        }
    }
    handleChangePass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChangeUser = (e) => {
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        /* if (this.state.userName === "dsj" && this.state.password === "123") {
            this.setState({
                flag: "2"
            })
        } */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.userName,
                password: this.state.password
            })
        };
        fetch('http://15.206.132.187:8080/login', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("response---", data)
                this.setState({ resp: data['status'] })
                console.log('My res--')
                console.log(this.state.resp)
                if (this.state.resp == "success") {
                    console.log('in if')
                    this.setState({
                        flag: "1",
                        user_id: data['user_id'],
                        user_type: data['user_type'],
                        full_name: data['full_name'],
                        branch:data['branch']
                    })
                    localStorage.setItem('full_name', this.state.full_name);
                    localStorage.setItem('user_type', this.state.user_type);
                    localStorage.setItem('user_id', this.state.user_id);
                    localStorage.setItem('loggedIn', 'success')
                    //console.log(this.state.full_name,this.state.user_type,this.state.user_id);
                    console.log('---->>>>>', localStorage.getItem('loggedIn'), localStorage.getItem('user_type'))
                    if(this.state.user_type===0){
                        this.state.flag="admin"
                    }else if(this.state.user_type===1){
                        this.state.flag="teacher"
                    }
                    /* else if(this.state.user_type===3){
                        this.state.branch=data['branch']
                    } */

                } else {
                    this.setState({
                        flag: "2"
                    })
                }

            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });


    }
    render() {
        if (this.state.user_type === 1) {
            return (
                <Redirect to="/teacherhome" />
            )
        }else if (this.state.user_type === 0) {
            return (
                <Redirect to="/admin" />
            )
        }else if (this.state.user_type===3){
            return(
                <Redirect to={`/hodhome/${this.state.branch}`}/>
            )
        } 
         /* else if (this.state.flag === "2") {
            alert('Wrong Pass')
            return (<UserLogin />)
        } */
        else {
            return (
                <div>

                    <div className="Login">
                        <h1 className="login_color">Login</h1>
                        <Card className="card3">
                            <Col>
                                <form onSubmit={this.handleSubmit}>
                                    
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputEmail3" placeholder="Email" value={this.state.userName} onChange={this.handleChangeUser}></input>

                                    </div>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePass}></input>

                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-2">
                                            <button type="submit" class="btn btn-primary">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Card>
                    </div>

                </div>


            );
        }
    }
}
export default UserLogin;