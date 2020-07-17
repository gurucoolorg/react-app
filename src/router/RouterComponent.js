
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import App from '../home/Home'
import { LandingPage} from '../home/LandingPage'
import UserLogin from '../Components/Login/UserLogin'
import TeacherDBSub from '../Components/DashBoard/TeacherDBSub';
import TeacherDBUpload from '../Components/DashBoard/TeacherDBUpload';
import  AdminHomePage  from '../Components/DashBoard/Admin/Admin';
import AdminAddStudents from '../Components/DashBoard/Admin/AdminAddStudents';
import AdminAddTeacher from '../Components/DashBoard/Admin/AdminAddTeacher';
import AdminAddSubject from '../Components/DashBoard/Admin/AdminAddSubject';
import Logout from '../Components/Logout/Logout';
import TopicList from '../Components/DashBoard/Doubts/DoubtsSubList';
import AttendenceDoubts from '../Components/DashBoard/Teacher/AttendenceDoubts';
import TeacherHomeScreen from '../Components/DashBoard/Teacher/TeacherHomeScreen';
import DoubtTopicList from '../Components/DashBoard/Doubts/DoubtTopicList';
import ActualMaterial from '../Components/DashBoard/Doubts/ActualMaterial';
import DoubtSection from '../Components/DashBoard/Doubts/DoubtSection';
import HODHomeScreen from '../Components/DashBoard/HOD/HODScreen1';
import HODEditTeacher from '../Components/DashBoard/HOD/HODEditTeacher';
export default class RouterComponent extends React.Component{
    render(){
        return(
        <div>
            <Switch>
                
                <Route exact path="/" component={LandingPage}/>
                {/* <Route exact path="/home1" component={Home1}/> */}
                <Route exact path="/loggedIn" component={App}/>
                <Route exact path="/login" component={UserLogin}/>
                <Route exact path ="/teacherdashboard" component={TeacherDBSub}/>
                <Route exact path ="/teacherdashboard/teacherupload/:id/:name" component={TeacherDBUpload}/>
                <Route exact path="/admin" component={AdminHomePage}/>
                <Route exact path="/admin/adminAddStudent" component={AdminAddStudents}/>
                <Route exact path="/admin/adminAddFaculty" component={AdminAddTeacher}/>
                <Route exact path="/admin/adminAddSubject" component={AdminAddSubject}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/teacher/topiclist/:id/:name" component={DoubtTopicList}/>
                <Route exact path="/teacher/att_doubts" component={AttendenceDoubts}/>
                <Route exact path="/teacherhome" component={TeacherHomeScreen}/>
                <Route exact path="/teacher/topiclist/details/:id/:name/:subId/:subName" component={ActualMaterial}/>
                <Route exact path ="/material/doubt/:id" component={DoubtSection}/>
                <Route exact path ="/hodhome/:branch" component={HODHomeScreen}/>
                <Route exact path ="/hod/editTeacher/:sub_id/:teacher_name/:branch" component={HODEditTeacher}/>


            </Switch>
        </div>
        );
    }
}