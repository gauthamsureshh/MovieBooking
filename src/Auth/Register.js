import { Link, useNavigate } from "react-router-dom"
import "../Styles/reg_css.css"
import { useState } from "react"
import axios from "axios"
import Details from "../Components/footer"

function Register(){
	const [name,setName]=useState('')
	const [email,setEmail]=useState('')
	const [password,setPassword]=useState('')
	const [passwordConf,setPasswordConf]=useState('')
	const [errormsg,setErrormsg]=useState({})
	const navigate=useNavigate()
	function registerUser(){
		const user={
			username:name,
			email:email,
			password1:password,
			password2:passwordConf
		}
		axios.post('http://127.0.0.1:8000/signup',user).then(response=>{
			setErrormsg('')
			navigate('/')
		}).catch(error=>{
			console.log(error)
			if(error.response.data){
				setErrormsg(error.response.data)
			}
			else{
				setErrormsg("API Connection Failed..!")
			}
		})
	}
    return(
		<>
    <div class="register-body">
		<div class="form signup">
			<div className="card">
            <h2>Sign Up</h2>
			{/* {errormsg?<div className="alert alert-danger">{errormsg}</div>:''} */}
			<div class="inputBox">
                <label className="label">Username</label>
				{errormsg.username && <div className="error">{errormsg.username}</div>}
				<input type="text" className="inputField" value={name} onInput={(event=>setName(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <label className="label">Email</label>
				{errormsg.email && <div className="error">{errormsg.email}</div>}
				<input type="text" className="inputField" value={email} onInput={(event=>setEmail(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <label className="label">New Password</label>
				{errormsg.password1 && <div className="error">{errormsg.password1}</div>}
				<input type="password" className="inputField" value={password} onInput={(event=>setPassword(event.target.value))}required="required"/>
			</div>
			<div class="inputBox">
                <label className="label">Confirm Password</label>
				{errormsg.password2 && <div className="error">{errormsg.password2}</div>}
				<input type="password" className="inputField" value={passwordConf} onInput={(event=>setPasswordConf(event.target.value))} required="required"/>
			</div>
			<div class="inputBox">
                <button className="btn btn-dark" onClick={registerUser}>Submit</button>
			</div>
			<p>Already a member ?  <Link to="/login"  className="login">SignIn</Link></p>
            </div>
		</div>
    </div>
	<Details/>
	</>
    )
}

export default Register