import { createSlice } from "@reduxjs/toolkit";
const ticketSlice=createSlice({
    name:"ticket",
    initialState:{
        selectedSeats:[],
        selectedDate:null,
        selectedTime:null,
        selectedmovieName:null,
        selectedUrl:null,
        selectedmovieId:null
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
        selectmovieName:(state,action)=>{
            state.selectedmovieName=action.payload
        },
        selectUrl:(state,action)=>{
            state.selectedUrl=action.payload
        },
        selectmovieId:(state,action)=>{
            state.selectedmovieId=action.payload
        }

    }
})

export const{selectSeat,selectDate,selectTime,selectmovieName,selectUrl,selectmovieId}=ticketSlice.actions
export default ticketSlice.reducer