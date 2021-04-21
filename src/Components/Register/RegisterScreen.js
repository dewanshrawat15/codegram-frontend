import { useState, useRef } from "react";
import "./RegisterScreen.css";
import { useHistory } from "react-router-dom";

function RegisterScreen(){

    const [username, setUsername] = useState(null);
    const [password, setPassowrd] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const history = useHistory();

    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const [component, updateComponent] = useState(<div ref={uploadedImage} className="image-holder-bttn" />);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if(file){
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
                updateComponent(<img id="profile-image-holder" ref={uploadedImage} src={current.src} className="image-holder" alt="Profile" />);
            };
            reader.readAsDataURL(file);
        }
    }

    const updateUsernameOrPassword = (identifier, e) => {
        if(identifier === "username"){
            setUsername(e.target.value);
        }
        if(identifier === "password"){
            setPassowrd(e.target.value);
        }
        if(identifier === "firstName"){
            setFirstName(e.target.value);
        }
        if(identifier === "lastName"){
            setLastName(e.target.value);
        }
    }

    const handleSubmit = () => {
        const formElem = document.getElementById("user-form");
        let formData = new FormData(formElem);
        let userData = {
            "username": username,
            "firstName": firstName,
            "lastName": lastName,
            "password": password
        };
        formData.set("data", JSON.stringify(userData));
        fetch("http://localhost:3000/users/create", {
            method: 'POST',
            body: formData
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log("An error occurred");
            }
        }).then(res => {
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("profileImageUrl", res.data.profileImageUrl);
            sessionStorage.setItem("firstName", res.data.firstName);
            sessionStorage.setItem("lastName", res.data.lastName);
            sessionStorage.setItem("authToken", res.data.authToken);
            history.push("/feed");
        })
    }

    return (
        <div className="register-screen">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center">
                        <h1 className="register-screen-title">Sign Up</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <br />
                        <form method="POST" onSubmit={handleSubmit} id="user-form">
                            <div className="profile-image-holder">
                                <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} name="profileImage" className="file-input" />
                                <div className="image-placeholder" onClick={() => imageUploader.current.click()}>
                                    {component}
                                </div>
                                <br />
                                Click to upload Image
                            </div>
                        </form>
                        <div className="form-placeholder">
                            <div className="form-group auth-groups">
                                <label htmlFor="firstName-laptop">First name:</label>
                                <input name="firstName" type="text" className="form-control" id="firstName-laptop" onChange={(e) => updateUsernameOrPassword("firstName", e)} />
                            </div>
                            <div className="form-group auth-groups">
                                <label htmlFor="lastName-laptop">Last name:</label>
                                <input name="lastName" type="text" className="form-control" id="lastName-laptop" onChange={(e) => updateUsernameOrPassword("lastName", e)} />
                            </div>
                            <div className="form-group auth-groups">
                                <label htmlFor="email-laptop">Username:</label>
                                <input name="username" type="text" className="form-control" id="email-laptop" onChange={(e) => updateUsernameOrPassword("username", e)} />
                            </div>
                            <div className="form-group auth-groups">
                                <label htmlFor="pwd-laptop">Password:</label>
                                <input name="password" type="password" className="form-control" id="pwd-laptop" onChange={(e) => updateUsernameOrPassword("password", e)} />
                            </div>
                            <br />
                            <button onClick={handleSubmit} type="submit" className="btn btn-default auth-bttn">
                                Sign up
                            </button>
                            <br /><br /><br />
                            <p className="helper-text">
                                Have an account? <a className="signup-link" href="/login">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;