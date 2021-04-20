import "./FeedScreen.css";
import { Redirect } from "react-router-dom";

function FeedScreen(){

    const username = sessionStorage.getItem("username");
    const authToken = sessionStorage.getItem("authToken");

    if(authToken === null){
        return <Redirect to="login" />
    } else {
        return (
            <div className="users-feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 header-title">
                            CodeGram
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedScreen;