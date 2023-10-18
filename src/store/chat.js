import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        addChat(state,action){
            return [...state,{ id:state.length, name:action.payload.name, text: action.payload.text}]
        },
        resetChat(state){
            return []
        },
    }
})

export const chatAction = chatSlice.actions;
export default chatSlice.reducer;