import { useState } from "react"
import "../Styles/auth_css.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Details from "../Components/footer"
import { useDispatch } from "react-redux"
import { setUser } from "../store/authSlice"

function Login(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [errormsg,setErrormsg]=useState('')
    const dispatch=useDispatch()
    const nav=useNavigate()

    function attemptLogin(){
        const user={
            username:username,
            password:password
        }
        axios.post('http://127.0.0.1:8000/login',user).then(response=>{
            setErrormsg('')
            var user={
                id:response.data.id,
                email:response.data.email,
                username:username,
                token:response.data.token
            }
            console.log(`token ${user.email}`)
            dispatch(setUser(user))
    nav("/")        
        }).catch(error=>{
            console.log(error)
            if(error.response.data.error){
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
        <>
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
                <Link to={'/adminlogin'} className="btn btn-outline-info">Admin Login</Link>
            </div>
            </div>
        </div>
        <Details/>
        </>

    )
}

export default Login