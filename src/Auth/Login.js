import { useState } from "react"
import "../Styles/auth_css.css"
import { Link } from "react-router-dom"
import axios from "axios"

function Login(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [errormsg,setErrormsg]=useState('')

    function attemptLogin(){
        const user={
            username:username,
            password:password
        }
        axios.post('http://127.0.0.1:8000/login',user).then(response=>{
            setErrormsg('')
            console.log(response.data.token)
        }).catch(error=>{
            if(error.response.data.errors){
                setErrormsg(Object.values(error.response.data.error).join(''))
            }
            else if(error.response.data.message){
                setErrormsg(error.response.data.message)
            }
            else{
                setErrormsg("Login Failed. Please Contact Admin")
            }
        })
    }
    
    return(
        <div className="login-body">
            <div className="form signin">
            <div className="card">
                <h2>Sign In</h2>
                {errormsg?<div className="alert alert-danger">{errormsg}</div>:''}
                <div class="inputBox">
                    <label className="label">Username</label>
                    <input className="inputField" type="text" value={username} onInput={(event)=>setUsername(event.target.value)} required="required" />
                </div>
                <div class="inputBox">
                    <label className="label">Password</label>
                    <input className="inputField" type="password" value={password} onInput={(event)=>setPassword(event.target.value)} required="required" />
                </div>
                <div class="inputBox">
                <button className="btn btn-secondary" onClick={attemptLogin}>Login</button>
                </div>
                <p className="reg">Not Registered? <Link to="/register"  className="login">Create an Account</Link></p>
            </div>
        </div>
        </div>
    )
}

export default Login