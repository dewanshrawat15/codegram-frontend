import "./ProjectDetail.css";
import { useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";

function Comment(props){

    const {username, date, comment} = props;
    const parsedDate = new Date(date);

    return (
        <div className="comment-placeholder">
            <div className="row">
                <div className="col-md-5 comment-username-placeholder">
                    @{username}
                </div>
                <div className="col-md-4 col-md-offset-3 date-placeholder">
                    {parsedDate.toLocaleString()}
                </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                    {comment}
                </div>
            </div>
        </div>
    );
}

function ProjectDetail(){

    const [projectDetails, updateProjectDetails] = useState(null);
    const [likes, updateLikesHook] = useState(null);
    const [comment, updateComment] = useState(null);
    const [allComments, updateAllComments] = useState(null);
    const history = useHistory();

    const authToken = sessionStorage.getItem("authToken");
    const { id } = useParams();
    
    const fetchProjectDetailsApi = "http://localhost:3000/project/" + id;

    const fetchAllComments = () => {
        const fetchCommentsOnProjectAPI = "http://localhost:3000/project/comments/" + id;
        fetch(fetchCommentsOnProjectAPI, {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                console.log(response)
            }
        }).then(res => {
            let coms = res.message;
            coms.sort((a, b) => {
                let dateA = new Date(a);
                let dateB = new Date(b);
                return dateA - dateB;
            });
            let listOfComments = [];
            coms.forEach(el => {
                let newCommentEl = <Comment key={el._id} {...el} />
                listOfComments.push(newCommentEl);
            });
            updateAllComments(listOfComments);
        })
    }

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
            fetchAllComments();
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

    const updateCommentState = (e) => {
        updateComment(e.target.value);
    }

    const addCommentOnProject = () => {
        const addCommentApi = "http://localhost:3000/comment/add";
        const commentData = {
            comment: comment,
            projectID: id
        };
        fetch(addCommentApi, {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                console.log(response);
            }
        }).then(res => {
            window.location.reload();
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
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-placeholder">
                                    <div className="form-group auth-groups">
                                        <label htmlFor="projectComment">Comment:</label>
                                        <textarea name="projectComment" id="projectComment" className="form-control" rows="5" onChange={(e) => updateCommentState(e)} ></textarea>
                                    </div>
                                </div>
                                <button onClick={addCommentOnProject} type="submit" className="btn btn-default auth-bttn">
                                    Add Comment
                                </button>
                            </div>
                        </div>
                        <br /><br />
                        {allComments}
                        <br />
                    </div>
                </div>
            );
        }
    }
}

export default ProjectDetail;