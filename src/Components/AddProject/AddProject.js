import "./AddProject.css";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

function AddProject(){

    const history = useHistory();
    const [projectTitle, updateProjectTitle] = useState(null);
    const [projectDetails, updateProjectDetails] = useState(null);

    const authToken = sessionStorage.getItem("authToken");

    const routeToProfile = () => {
        history.push("/profile");
    }

    const updateProject = (det, e) => {
        if(det === "projectTitle"){
            updateProjectTitle(e.target.value);
        }
        if(det === "projectDetails"){
            updateProjectDetails(e.target.value);
        }
    }

    const handleSubmit = () => {
        const formElem = document.getElementById("project-form");
        let formData = new FormData(formElem);
        let projectData = {
            "title": projectTitle,
            "details": projectDetails
        };
        console.log(JSON.stringify(projectData));
        formData.set("data", JSON.stringify(projectData));
        fetch("http://localhost:3000/project/new", {
            method: 'POST',
            headers: {
                'Authorization': authToken
            },
            body: formData
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log("An error occurred");
            }
        }).then(res => {
            history.push("/feed");
        })
    }

    if(authToken === null){
        return <Redirect to="login" />
    } else {
        return (
            <div className="add-project">
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
                        <div className="col-md-8 col-md-offset-2">
                            <div className="form-placeholder">
                                <div className="form-group auth-groups">
                                    <label htmlFor="projectTitle-laptop">Project title:</label>
                                    <input name="projectTitle" type="text" className="form-control" id="projectTitle-laptop" onChange={(e) => updateProject("projectTitle", e)} />
                                </div>
                                <div className="form-group auth-groups">
                                    <label htmlFor="projectDetails-laptop">Project details:</label>
                                    <textarea name="projectDetails" id="projectDetails-laptop" className="form-control" rows="9" onChange={(e) => updateProject("projectDetails", e)} ></textarea>
                                </div>
                                <form id="project-form">
                                    <div className="form-group">
                                        <label htmlFor="myfile">Select a file:</label>
                                        <input type="file" accept="image/*" name="projectImage" />
                                    </div>
                                </form>
                                <br />
                                <button onClick={handleSubmit} type="submit" className="btn btn-default auth-bttn">
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProject;