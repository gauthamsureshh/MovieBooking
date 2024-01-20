import "../Styles/auth_css.css"
import { Link } from "react-router-dom"

function Login(){
    
    return(
        <div className="login-body">
            <div class="form signin">
            <div className="card">
                <h2>Sign In</h2>
                <div class="inputBox">
                    <span>Username</span>
                    <input className="inputField" type="text" required="required" />
                </div>
                <div class="inputBox">
                    <span>Password</span>
                    <input className="inputField" type="password" required="required" />
                </div>
                <div class="inputBox">
                <button className="btn btn-secondary">Login</button>
                </div>
                <p className="reg">Not Registered? <Link to="/register"  className="login">Create an Account</Link></p>
            </div>
        </div>
        </div>
    )
}

export default Login