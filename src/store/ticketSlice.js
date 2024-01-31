import { createSlice } from "@reduxjs/toolkit";
const ticketSlice=createSlice({
    name:"ticket",
    initialState:{
        selectedSeats:[],
        selectedDate:null,
        selectedTime:null,
        movieId:null
    },
    reducers:{
        selectSeat:(state,action)=>{
            state.selectedSeats=action.payload
        },
        selectDate:(state,action)=>{
            state.selectedDate=action.payload
        },
        selectTime:(state,action)=>{
            state.selectedTime=action.payload
        },
        selectmovieId:(state,action)=>{
            state.movieId=action.payload
        } 
    }
})

export const{selectSeat,selectDate,selectTime,selectmovieId}=ticketSlice.actions
export default ticketSlice.reducer