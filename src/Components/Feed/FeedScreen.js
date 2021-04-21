import "./FeedScreen.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function FeedPost(props){
    const {image, title, details, date} = props;

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
                                <h1 className="feed-post-title">{title}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="feed-post-date">{date}</p>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <p className="feed-post-details">{details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="feed-post-title text-center">{title}</h1>
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
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <p className="feed-post-details text-center">{details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeedScreen(){

    const [projectDetails, updateProjectDetails] = useState([]);

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
                    let projectFeed = <FeedPost {...el} key={el.title} />;
                    projects.push(projectFeed);
                });
                updateProjectDetails(projects);
            }
        })
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
                    </div>
                    <br /><br />
                    <div className="row">
                        {projectDetails}
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedScreen;