import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_name: 'default',
    age: 0,
    gender: 'other',
    role: 'admin',
    isLogin: false,
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        testLogin(state,action){
            state.user_name = action.payload.user_name
            state.role = action.payload.role
            state.isLogin = true
        },
        profileSetting(state,action){
            const { user_name, age, gender, profile_image } = action.payload
            console.log(profile_image)
            state.user_name = user_name
            state.age = age
            state.gender = gender
        },
        nameSetting(state,action){
            state.user_name = action.payload
        },
        ageSetting(state,action){
            state.age = action.payload
        },
        genderSetting(state,action){
            state.gender = action.payload
        }
    }
})

export const profileAction = profileSlice.actions;
export default profileSlice.reducer;