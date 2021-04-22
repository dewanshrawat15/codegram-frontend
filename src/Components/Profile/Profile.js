import "./Profile.css";
import { Redirect, useHistory } from "react-router-dom";
export default function Profile(){
    const hist = useHistory();
    const username = sessionStorage.getItem("username");
    const authToken = sessionStorage.getItem("authToken");
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");
    const profileImageUrl = sessionStorage.getItem("profileImageUrl");

    const handleLogout = () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("profileImageUrl");
        hist.push("/login");
    }

    const routeToProfile = () => {
        hist.push("/feed");
    }

    if(authToken === null){
        return <Redirect to="/login" />;
    } else {
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 onClick={routeToProfile} className="profile-title">CodeGram</h1>
                        </div>
                    </div>
                    <br /><br /><br /><br />
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <center>
                                <img src={profileImageUrl} width="250" className="img-responsive img-circle" alt={username} />
                            </center>
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center profile-name">
                            {firstName} {lastName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center profile-username">
                            @{username}
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <center>
                                <span onClick={handleLogout} className="profile-logout-bttn">Logout</span>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}