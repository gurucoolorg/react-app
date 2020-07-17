import React from 'react'
import { Redirect } from 'react-router-dom';
import S3FileUpload from 'react-s3';
import { Row, Card } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import './TeacherDBUpload.css'
import TeacherNavBar from '../NavBar/TeacherNavBar';
import Loader from '../Loader/Loader';
import TeacherUploadNavBar from '../NavBar/TeacherUploadNavBar';
const config = {
    bucketName: 'sahilwow',
    dirName: '', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIAVNOU6MDJN4VEXIHS',
    secretAccessKey: '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',
    
}
const history = createBrowserHistory();
class TeacherDBUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            videoUrl: "",
            materialUrl: [],
            loader: false,
            material_s3Url: []
        }


    }
    componentWillMount() {
        console.log(this.props.match.params.id);

    }
    componentDidMount() {
        /* if (this.props.history.action === "POP") {
            // custom back button implementation
            this.props.history.goBack();
        } */
        console.log(this.props.match.params.id);
    }
    getFilePath = (e) => {
        this.setState({
            loader: true
        })
        var i;
        var path = e.target.files

        for (i = 0; i < path.length; i++) {
            //this.state.materialUrl.push(path[i])
            S3FileUpload.uploadFile(path[i], config)
                .then((data) => {
                    console.log('material urls')
                    console.log(data["location"]);
                    // this.setState({loader:false})
                    this.state.materialUrl.push(data['location'])

                })
                .catch((err) => {

                    console.log(err.message);
                    
                })
        }
        /*  //console.log(this.state.materialUrl)
         S3FileUpload.uploadFile(temp, config)
             .then((data) => {
                 console.log('material urls')
                 console.log(data["location"]);
                 this.setState({loader:false,material_s3Url:data['location']})
             })
             .catch((err) => {
                 alert(err);
             }) */
    }
    getVideoPath = (e) => {
        this.setState({
            loader: true
        })
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data["location"]);
                this.setState({ videoUrl: data["location"], loader: false });

            })
            .catch((err) => {
                alert(err);
            })
    }
    handleTitle = (e) => {
        this.state.title = e.target.value
    }
    handleDesc = (e) => {
        this.state.description = e.target.value
    }
    handleSubmit = (e) => {
        console.log("title: ", this.state.title, "\nDescription: ", this.state.description, "\nMaterial Url: ", this.state.materialUrl, "\nVideo: ", this.state.videoUrl,this.props.match.params.id);
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic:this.state.title,
                subject_id:this.props.match.params.id,
                lecture_url:this.state.videoUrl,
                resource_url:this.state.materialUrl

            })
        };
        fetch('http://15.206.132.187:8080/upload/material', requestOptions)
            .then(async response => {
                //const data = await response.json();
                console.log('->',response);
                /* if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                    

                } */
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
            

    }
    render() {
        return (
            <div>
                <TeacherUploadNavBar />
                <div className="tv-outer-div">
                    <Card className="card4">
                        <form className="tv-form" onSubmit={this.handleSubmit}>
                            <h3 className="text-center">{this.props.match.params.name}</h3>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="title" placeholder="Title" onChange={this.handleTitle}></input>
                            </div>
                            <div class="col-sm-10">
                                <textarea type="text" class="form-control" name="description" placeholder="Description" onChange={this.handleDesc}></textarea>
                            </div>
                            <hr
                                style={{
                                    color: '#000',
                                    backgroundColor: '#fff',
                                    height: 5
                                }}
                            />
                            <div class="col-sm-6">
                                <label>Upload Materials</label>
                                <input type="file" id="file" multiple="multiple" onChange={this.getFilePath} />
                            </div>
                            <hr
                                style={{
                                    color: '#000',
                                    backgroundColor: '#fff',
                                    height: 5
                                }}
                            />
                            <div class="col-sm-6">
                                <label>Upload Video</label>
                                <input type="file" id="video file" accept=".mp4" onChange={this.getVideoPath} />
                            </div>
                            {/* <input type="text" name="title" placeholder="Title" onChange={this.handleTitle} />
                        <input type="text" name="description" placeholder="Description" onChange={this.handleDesc} />
                        <input type="file" id="file" multiple="multiple" onChange={this.getFilePath} />
                        <input type="file" id="video file" accept=".mp4" onChange={this.getVideoPath} /> */}
                            <div class="form-group row">
                                <div class="col-sm-10 offset-sm-0">
                                    <button type="submit" class="btn btn-primary">Upload</button>
                                </div>
                            </div>



                        </form>
                    </Card>

                </div>


            </div>

        );

    }
}
export default TeacherDBUpload;





