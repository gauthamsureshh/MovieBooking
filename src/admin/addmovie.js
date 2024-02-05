import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import "./ad_css/addmov.css"
import Select from "react-select";

function AddMovie(){
    const nav=useNavigate()
    const [title,setTile]=useState('')
    const [genre,setGenre]=useState('')
    const [dateofrelease,setRelease]=useState('')
    const[posterUrl,setPosterUrl]=useState('')
    const[duration,setDuration]=useState('')
    const[showtime,setShowtime]=useState([])
    const[showbegins,setShowbegins]=useState('')
    const[showends,setShowends]=useState('')
    function addMovie(){
        axios.post('http://127.0.0.1:8000/addmovie',{
            movie_title:title,
            genre:genre,
            duration:duration,
            poster_url:posterUrl,
            showTimes:showtime.map((time)=>time.value),
            showbegins:showbegins,
            showends:showends,
            date_of_release:dateofrelease
        }).then(response=>{
                alert("Movie Added Sucessfully")
                nav("/admin")
        }).catch((error)=>console.log(error))
    }
    const showTimeoptions=[
        {value:'11:30 AM',label:'11:30 AM'},
        {value:'02:30 PM',label:'02:30 PM'},
        {value:'05:00 PM',label:'05:00 PM'},
        {value:'09:00 PM',label:'09:00 PM'} 
    ]
    const handletimeChange=(selectedShowtime)=>{
        setShowtime(selectedShowtime)
    }
    return(
        <div className=" adminAddmovie">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{color:'rgb(221, 130, 54)'}}>ADD SHOWS</h1>
                    <div className="form-group">
                        <label className="add-label">Title</label>
                        <input 
                        type="text" 
                        value={title}
                        className="form-control" 
                        onChange={(event)=>{setTile(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">Genre</label>
                        <input
                        type="text"
                        value={genre}
                        className="form-control"
                        onChange={(event)=>{setGenre(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">Duration</label>
                        <input type="text"
                        className="form-control" 
                        placeholder="HH:MM:SS"
                        value={duration}
                        onChange={(event)=>{setDuration(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">Show Starting Date</label>
                        <input type="text"
                        className="form-control" 
                        placeholder="YYYY-MM-DD"
                        value={showbegins}
                        onChange={(event)=>{setShowbegins(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">Show Ending Date</label>
                        <input type="text"
                        className="form-control" 
                        placeholder="YYYY-MM-DD"
                        value={showends}
                        onChange={(event)=>{setShowends(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">Show Time</label>
                        <Select isMulti options={showTimeoptions}
                        value={showtime}
                        onChange={handletimeChange} className="genre-select"/>
                    </div>
                    <div className="form-group">
                        <label className="add-label">Date Of Release</label>
                        <input type="text"
                        className="form-control" 
                        placeholder="YYYY-MM-DD"
                        value={dateofrelease}
                        onChange={(event)=>{setRelease(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="add-label">URL of Poster</label>
                        <input type="text"
                        className="form-control" 
                        placeholder="Paste Image URl"
                        value={posterUrl}
                        onChange={(event)=>{setPosterUrl(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <Link to={'/admin'} className="btn btn-info">Back</Link>
                        <button className="btn btn-success" onClick={addMovie}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
                
    )
}

export default AddMovie