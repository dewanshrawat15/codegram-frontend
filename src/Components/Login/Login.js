import { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState(null);
    const [password, setPassowrd] = useState(null);

    const history = useHistory();

    const updateUsernameOrPassword = (identifier, e) => {
        if(identifier === "username"){
            setUsername(e.target.value);
        }
        if(identifier === "password"){
            setPassowrd(e.target.value);
        }
    }

    const handleSubmit = () => {
        let userData = {
            "username": username,
            "password": password
        };
        fetch("http://localhost:3000/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log("An error occurred");
            }
        }).then(res => {
            if(res.data){
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("profileImageUrl", res.data.profileImageUrl);
                sessionStorage.setItem("firstName", res.data.firstName);
                sessionStorage.setItem("lastName", res.data.lastName);
                sessionStorage.setItem("authToken", res.data.authToken);
                history.push("/feed");
            }
        })
    }

    return (
        <div className="register-screen">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center">
                        <h1 className="register-screen-title">Login</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <br />
                        <div className="form-placeholder">
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
                                Login
                            </button>
                            <br /><br /><br />
                            <p className="helper-text">
                                Don't have an account yet? <a className="signup-link" href="/register">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;