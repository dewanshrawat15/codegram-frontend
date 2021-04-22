import "./ProjectDetail.css";
import { useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";

function ProjectDetail(props){

    const [projectDetails, updateProjectDetails] = useState(null);
    const [likes, updateLikesHook] = useState(null);
    const history = useHistory();

    const authToken = sessionStorage.getItem("authToken");
    const { id } = useParams();
    
    const fetchProjectDetailsApi = "http://localhost:3000/project/" + id;

    const fetchProjectDetails = () => {
        fetch(fetchProjectDetailsApi, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log(response);
            }
        }).then(res => {
            updateProjectDetails(res.data);
            updateLikesHook(res.data.likes);
        })
    }

    const updateLikes = () => {
        const projectLikeUpdateUrl = fetchProjectDetailsApi + "/like";
        fetch(projectLikeUpdateUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            } else{
                console.log("Error occured")
            }
        }).then(res => {
            updateLikesHook(res.data.likes);
        })
    }

    const routeToProfile = () => {
        history.push("/profile");
    }

    const routeToFeedScreen = () => {
        history.push("/feed")
    }

    if(authToken === null){
        return <Redirect to="login" />
    } else {
        if(projectDetails === null){
            fetchProjectDetails();
            return (
                <div className="project-details">
                    <div className="container">
                        <div className="row">
                            <div onClick={routeToFeedScreen} className="col-md-5 header-title">
                                CodeGram
                            </div>
                            <div className="col-md-3 col-md-offset-4 header-title account-icon-placeholder">
                                <i onClick={routeToProfile} className="fa fa-user-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (            
                <div className="project-details">
                    <div className="container">
                        <div className="row">
                            <div onClick={routeToFeedScreen} className="col-md-5 header-title">
                                CodeGram
                            </div>
                            <div className="col-md-3 col-md-offset-4 header-title account-icon-placeholder">
                                <i onClick={routeToProfile} className="fa fa-user-circle"></i>
                            </div>
                        </div>
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="project-title">
                                    {projectDetails.title}
                                </h1>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <p className="project-date">{projectDetails.date}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <center>
                                    <img className="img-responsive" src={projectDetails.projectImage} alt={projectDetails.title} />
                                </center>
                            </div>
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="col-md-4">
                                <i onClick={updateLikes} className="fa fa-heart"></i> {likes}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="project-details">
                                    {projectDetails.details}
                                </p>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            );
        }
    }
}

export default ProjectDetail;