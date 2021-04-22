import "./FeedScreen.css";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

function FeedPost(props){
    const {image, title, details, date, likes, _id} = props;
    const [numberOfLikes, updateLikesHook] = useState(likes);
    const history = useHistory();
    let projectDetails = details.substring(0, 150);

    const updateLikes = () => {
        const authToken = sessionStorage.getItem("authToken");
        const projectLikeUpdateUrl = "http://localhost:3000/project/" + _id + "/like";
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

    const openProjectPage = () => {
        const route = "/project-detail/" + _id;
        history.push(route);
    }

    return (
        <div className="feed-post">
            <div className="laptop">
                <div className="row">
                    <div className="col-md-3">
                        <center>
                            <img height="100" src={image} className="img-responsive" alt={title} />
                        </center>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 onClick={openProjectPage} className="feed-post-title">{title}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="feed-post-date">{date}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="feed-post-details">{projectDetails}...</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="feed-post-likes">
                                    <i onClick={updateLikes} className="fa fa-heart"></i> {numberOfLikes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile">
                <div className="row">
                    <div className="col-md-8">
                        <h1 onClick={openProjectPage} className="feed-post-title text-center">{title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="feed-post-date text-center">{date}</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <center>
                            <img src={image} className="img-responsive" alt={title} />
                        </center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="feed-post-details text-center">{details}</p>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <p className="feed-post-likes text-center">
                            <i onClick={updateLikes} className="fa fa-heart"></i> {likes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeedScreen(){

    const [projectDetails, updateProjectDetails] = useState([]);
    const history = useHistory();

    const authToken = sessionStorage.getItem("authToken");

    const fetchProjects = () => {
        fetch("http://localhost:3000/projects", {
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
                console.log("An error occurred");
            }
        }).then(res => {
            if(res.data){
                let projects = [];
                res.data.forEach(el => {
                    let projectFeed = <FeedPost {...el} key={el._id} />;
                    projects.push(projectFeed);
                });
                updateProjectDetails(projects);
            }
        })
    }

    const routeToProfile = () => {
        history.push("/profile");
    }

    const routeToAddNewProjectScreen = () => {
        history.push("/project/new");
    }

    if(authToken === null){
        return <Redirect to="login" />
    } else {
        if(projectDetails.length === 0){
            fetchProjects();
        }
        return (
            <div className="users-feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 header-title">
                            CodeGram
                        </div>
                        <div className="col-md-3 col-md-offset-4 header-title account-icon-placeholder">
                            <i onClick={routeToProfile} className="fa fa-user-circle"></i>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        {projectDetails}
                    </div>
                    <div className="add-project-bttn" onClick={routeToAddNewProjectScreen}>
                        <i className="fa fa-plus"></i> Add Project
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedScreen;