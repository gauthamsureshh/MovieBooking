import { Link } from "react-router-dom"
import "../Styles/reg_css.css"

function Register(){
    return(
    <div class="register-body">
		<div class="form signup">
			<div className="card">
            <h2>Sign Up</h2>
			<div class="inputBox">
                <span>Username</span>
				<input type="text" className="inputField" required="required"/>
			</div>
			<div class="inputBox">
                <span>Email</span>
				<input type="text" className="inputField" required="required"/>
			</div>
			<div class="inputBox">
                <span>New Password</span>
				<input type="password" className="inputField" required="required"/>
			</div>
			<div class="inputBox">
                <span>Confirm Password</span>
				<input type="password" className="inputField" required="required"/>
			</div>
			<div class="inputBox">
                <button className="btn btn-dark">Submit</button>
			</div>
			<p>Already a member ?  <Link to="/login"  className="login">SignIn</Link></p>
            </div>
		</div>
    </div>
    )
}

export default Register