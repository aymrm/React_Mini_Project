import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backgroundColor:'#D3D3D3',
    fontSize: '16px',
    color: '#000000',
    default: { backgroundColor: '#D3D3D3', fontSize: '16px', color: '#000000'},
    save:{},
}

const siteSettingSlice = createSlice({
    name:'siteSetting',
    initialState,
    reducers:{
        siteSetting(state,action){
            const { backgroundColor, fontSize, color} = action.payload
            state.backgroundColor = backgroundColor
            state.fontSize = `${fontSize}px`
            state.color = color
        },
        backgroundColorChange(state,action){
            const { backgroundColor } = action.payload
            state.backgroundColor = backgroundColor
        },
        fontSizeChange(state,action){
            const { fontSize } = action.payload
            state.fontSize = `${fontSize}px`
        },
        colorChange(state,action){
            const { color } = action.payload
            state.color = color
        },
        saveSetting(state){
            const { backgroundColor, fontSize, color } = state
            state.save = { backgroundColor, fontSize, color }
        },
        returnSetting(state){
            const { backgroundColor, fontSize, color } = state.save
            state.backgroundColor = backgroundColor
            state.fontSize = fontSize
            state.color = color
            state.save = {}
        },
        returnDefaultSetting(state){
            const { backgroundColor, fontSize, color } = state.default
            state.backgroundColor = backgroundColor
            state.fontSize = fontSize
            state.color = color
            state.save = {}
        }
    }
})

export const siteSettingAction = siteSettingSlice.actions;
export default siteSettingSlice.reducer;