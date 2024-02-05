import React,{ useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function ListMovies(){
    const [list,setList]=useState([])
    function fetchList(){
        axios.get('http://127.0.0.1:8000/movielist').then(response=>{
            setList(response.data)
        })
    }
        useEffect(()=>{
            fetchList()
        },[])
    const nav=useNavigate()
    const handleEdit=(movieid)=>{
        nav(`/editmovie/${movieid}`)
    }
    const deleteMovie=(movieid)=>{
        axios.delete(`http://127.0.0.1:8000/deletemovie/${movieid}`).then(response=>{
            alert(response.data)
        })
    }

    const disablemovie =(movieid,isDisabled)=>{
        axios.put(`http://127.0.0.1:8000/disablemovie/${movieid}`).then(response=>{
            if (response.data.disabled ==true){
                alert(`${response.data.movie_title} is canceled`)
            }
            else{
                alert(`${response.data.movie_title} is Now Running`)
            }
            fetchList()
        })
    }

    const togglestatus=(movieId,isDisabled)=>{
        disablemovie(movieId,isDisabled)
    }
    return(
        <>
        <div className="adminListmovie">
        <h2 className="text-white">NOW RUNNING MOVIES</h2>
        <table className="table table-hover" border="1" >
        <thead className="thead">
            <tr>
                <th>Movie Id</th>
                <th>Title</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {list.map(movie=>(
                <tr className='table-dark' key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.movie_title}</td>
                    <td>
                        <button className="btn btn-info btn-edit" onClick={()=>handleEdit(movie.id)}>EDIT</button>
                        <button className="btn btn-danger" onClick={()=>deleteMovie(movie.id)}>DELETE</button>
                        <button className="btn btn-warning" onClick={()=>togglestatus(movie.id,movie.disabled)}>
                        {movie.disabled ? 'ENABLE' : 'DISABLE'}
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
        </>
    )
}
export default ListMovies