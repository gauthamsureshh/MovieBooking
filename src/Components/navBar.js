import React, { useState } from "react"
import logo from '../Images/logo3.png'
import NavStyle from "./nav_Style"
import "../Styles/dropdown.css"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../store/authSlice";


function NavBar(){
    const [searchTerm,setSearchTerm]=useState('')
    const handleSearchInput=(event)=>{
        event.preventDefault()
        setSearchTerm(event.target.value)
        console.log('main',searchTerm)
    }

    const handleSearch=(event)=>{
        event.preventDefault()
        if(searchTerm.trim()!=='')
        {
            nav(`/searchhresult/${searchTerm}`)
        }
        
    }

    const user=useSelector(store=>store.auth.user)
    const dispatch=useDispatch()
    const nav=useNavigate()
    function logout(){
        if(user){
            axios.post('http://127.0.0.1:8000/logout',{},{
                headers:{'Authorization':'Bearer'+user.token}
            })
            alert("Logged Out")
            dispatch(removeUser())
            nav('/login')
        }
    }
    const handleSignIn=()=>{
        nav("login")
    }

    return (

        <nav class="navbar fixed-top navbar-expand-lg navbar-black custom-navbar bg-black">
            <a class="navbar-brand" href="#">
                <img src={logo} width="100" height="30" className="d-inline-block align-top" alt="Theatre Logo"/>
            </a>
            <div class="collapse navbar-collapse" id="navbarToggler">
                <div className="container">
                    <NavStyle/>
                </div>
                
            </div>
            <div className="ml-auto">
            <input 
                        className="form-control mr-sm-2 medium-search-bar" type="search" 
                        placeholder="Search for Movies" aria-label="Search" value={searchTerm}
                        onChange={handleSearchInput}
            />
            </div>
            <div>
                <button
                className="btn btn-small btn-success mr-1"
                type="button"
                value={searchTerm}
                onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {user ?(
                <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Welcome,{user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item ><Link to={'/'} style={{textDecoration:'none'}} className="drop-down">Home</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to={'/mybooking'} style={{textDecoration:'none'}} className="drop-down">My Booking</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to={'/aboutus'} style={{textDecoration:'none'}} className="drop-down">AboutUs</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to={'/contactus'} className="drop-down" style={{textDecoration:'none'}}>ContactUs</Link></Dropdown.Item>
                    <Dropdown.Item className="drop-down" onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            ):(
            <button className="btn btn-danger"
                        type="button" 
                        onClick={handleSignIn}
                        >SignIn
            </button>
            )}
        </nav>
    )
}


export default NavBar