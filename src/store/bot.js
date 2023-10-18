import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state:0,
    voice:0,
    message:'',
}

const botSlice = createSlice({
    name:'bot',
    initialState,
    reducers:{
        setState(state,action){
            state.state = action.payload  
        },
        setVocie(state,action){
            state.voice = action.payload
        },
        setMesaage(state,action){
            state.message = action.payload  
        },
        speechMessage(state,action){
            state.state = 2
            state.message = action.payload 
        },
        toggleVocie(state){
            state.voice = ( state.voice + 1 ) % 2
        },
        endMessage(state){
            state.state = 1
            state.message = ''
        },
        reset(){
            return { state:0, voice:0, message:'' }
        }
    }
})

export const botAction = botSlice.actions;
export default botSlice.reducer;