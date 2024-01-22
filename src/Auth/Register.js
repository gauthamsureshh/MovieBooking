import { Link, useNavigate } from "react-router-dom"
import "../Styles/reg_css.css"
import { useState } from "react"
import axios from "axios"

function Register(){
	const [name,setName]=useState('')
	const [email,setEmail]=useState('')
	const [password,setPassword]=useState('')
	const [passwordConf,setPasswordConf]=useState('')
	const [errormsg,setErrormsg]=useState('')
	const navigate=useNavigate()
	function registerUser(){
		const user={
			name:name,
			email:email,
			password:password,
			password_confirmation:passwordConf
		}
		axios.post('http://127.0.0.1:8000/signup',user).then(response=>{
			setErrormsg('')
			navigate('/')
		}).catch(error=>{
			if(error.response.data.errors){
				setErrormsg(Object.values(error.response.data.errors).join(''))
			}
			else{
				setErrormsg("API Connection Failed..!")
			}
		})
	}
    return(
    <div class="register-body">
		<div class="form signup">
			<div className="card">
            <h2>Sign Up</h2>
			{errormsg?<div className="alert alert-danger">{errormsg}</div>:''}
			<div class="inputBox">
                <span>Username</span>
				<input type="text" className="inputField" value={name} onInput={(event=>setName(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <span>Email</span>
				<input type="text" className="inputField" value={email} onInput={(event=>setEmail(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <span>New Password</span>
				<input type="password" className="inputField" value={password} onInput={(event=>setPassword(event.target.value))}required="required"/>
			</div>
			<div class="inputBox">
                <span>Confirm Password</span>
				<input type="password" className="inputField" value={passwordConf} onInput={(event=>setPasswordConf(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <button className="btn btn-dark" onClick={registerUser}>Submit</button>
			</div>
			<p>Already a member ?  <Link to="/login"  className="login">SignIn</Link></p>
            </div>
		</div>
    </div>
    )
}

export default Register