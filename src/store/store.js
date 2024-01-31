import {configureStore} from "@reduxjs/toolkit"
import authReducer from  './authSlice'
import ticketReducer from './ticketSlice'

var store=configureStore({
    reducer:{
        auth:authReducer,
        ticket:ticketReducer
    },
})
export default store
