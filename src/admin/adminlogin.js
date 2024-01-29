import axios from "axios"
import { useState } from "react"

function AdminLogin(){
    const[adminemail,setAdminemail]=useState('')
    const[password,setPassword]=useState('')
    const[errormsg,setErrormsg]=useState('')

    function adminLogin(){
        axios.post('url',{
            email:adminemail,
            password:password
        }).then(response=>{
            setErrormsg('')
        }).catch(error=>{
            console.log(error)
            if(error.response.data.error){
                setErrormsg(Object.values(error.response.data.error).join(''))
            }
            else if(error.response.data.message){
                setErrormsg(error.response.data.message)
            }
        })
    }

    return (
        <div className="login-body">
            <div className="form signin">
            <div className="card">
                <h2>Admin LogIn</h2>
                {errormsg?<div className="alert alert-danger">{errormsg}</div>:''}
                <div className="inputBox">
                    <label className="label">Email</label>
                    <input className="inputField" type="text" value={adminemail} onInput={(event)=>setAdminemail(event.target.value)} required="required" />
                </div>
                <div className="inputBox">
                    <label className="label">Password</label>
                    <input className="inputField" type="password" value={password} onInput={(event)=>setPassword(event.target.value)} required="required" />
                </div>
                <div className="inputBox">
                <button className="btn btn-secondary" type="button" onClick={adminLogin}>Login</button>
                </div>
            </div>
            </div>
        </div>
    )
}
export default AdminLogin