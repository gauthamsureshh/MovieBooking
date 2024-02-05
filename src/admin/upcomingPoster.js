import React,{useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UpcomingPoster(){
    const [poster,setPoster]=useState('')
    const nav=useNavigate()
    function addPoster(){
        axios.post('http://127.0.0.1:8000/addupcoming',{
            upcoming:poster,
        }).then(response=>{
                alert(response.data)
                nav("/admin")
        }).catch((error)=>console.log(error))
    }


    return(
        <div className="upComing">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{color:'rgb(221, 130, 54)'}}>Add Upcoming Movie Poster</h1>
                    <div className="form-group">
                        <label className="add-label">Poster URL</label>
                        <input 
                        type="text" 
                        value={poster}
                        className="form-control" 
                        onChange={(event)=>{setPoster(event.target.value)}}
                        />
                    </div>
                    <button className="btn btn-success" onClick={addPoster} >Submit</button>
                </div>
            </div>      
        </div>     

    )
}

export default UpcomingPoster