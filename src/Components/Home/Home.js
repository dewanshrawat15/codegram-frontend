import { Component } from "react";
import "./Home.css";

class Home extends Component{

    routeToSignUp = () => {
        window.location.href = "/register";
    }

    routeToLogin = () => {
        window.location.href = "/login";
    }

    render(){
        return(
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center">
                            <h1 className="home-title">CodeGram</h1>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1 text-center">
                            <p className="home-tagline">
                                A platform for developers to showcase their amazing projects!
                            </p>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-2 col-md-offset-4">
                            <span className="home-bttn" onClick={this.routeToSignUp}>
                                Sign up
                            </span>
                        </div>
                        <div className="col-md-2">
                            <span className="home-bttn" onClick={this.routeToLogin}>
                                Log in
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;