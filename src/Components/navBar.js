import React from "react"
import logo from '../Images/logo3.png'
import NavStyle from "./nav_Style"
import { useNavigate } from "react-router-dom"



function NavBar(){
    // Search function along logic goes here



    // function to check the key enter
    const nav=useNavigate()
    const handleSignIn=()=>{
        nav("login")
    }

    return (

        <nav class="navbar fixed-top navbar-expand-lg navbar-black bg-black">
            <a class="navbar-brand" href="#">
                <img src={logo} width="100" height="30" className="d-inline-block align-top" alt="Theatre Logo"/>
            </a>
            <div class="collapse navbar-collapse" id="navbarToggler">
                <form class="form-inline   my-lg-0 d-none d-lg-block">
                <div className="container">
                    <NavStyle/>
                </div>
                </form>
            </div>
            <div className="ml-auto">
            <input 
                        className="form-control mr-sm-2 medium-search-bar" type="search" 
                        placeholder="Search for Movies" aria-label="Search"
                        // onKeyPress={}
                        // onChange={}
                    />
                    </div>
            <button className="btn btn-danger"
                        type="button" 
                        onClick={handleSignIn}
                        >SignIn
            </button>
        </nav>
    )
}


export default NavBar