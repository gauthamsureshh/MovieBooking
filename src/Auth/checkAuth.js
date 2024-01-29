import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const checkAuth=(Component)=>{
    function Wrapper(props){
        const user=useSelector(store=>store.auth.user)
        const nav=useNavigate()
        useEffect(()=>{
            if(!user){
                nav('/login')
            }
        },[user])
        return <Component {...props}/>
    }
    return Wrapper
}

export default checkAuth