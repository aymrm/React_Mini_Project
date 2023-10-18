import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    center_name: 'default',
    admin: [],
    member: [],
    lay_out: { detail: [], rect: { width:350, height:500, left:325, top:80 } },
}

const centerSlice = createSlice({
    name:'center',
    initialState,
    reducers:{
        centerSetting(state,action){
            const { center_name, admin, member} = action.payload
            state.center_name = center_name
            state.admin = admin
            state.member = member
        },
        addAdmin(state,action){
            const { data } = action.payload
            state.admin = [...state.admin,data]
        },
        delAdmin(state,action){
            const { admin_id } = action.payload
            state.admin = state.admin.filter( e => e.id !== admin_id )
        },
        addMember(state,action){
            const { data } = action.payload
            state.member = [...state.member,data]
        },
        delAdmin(state,action){
            const { member_id } = action.payload
            state.member = state.member.filter( e => e.id !== member_id )
        },
        setLayout(state,action){
            state.lay_out = {...state.lay_out, detail:action.payload}
        },
        newLayoutBox(state,action){
            state.lay_out = {...state.lay_out, detail: [...state.lay_out.detail,action.payload]}
        },
        delLayoutBox(state,action){
            state.lay_out = {...state.lay_out, detail: state.lay_out.detail.filter( e => e.id !== action.payload)}
        },
        layoutSetPosition(state,action){
            const {id,position} = action.payload
            state.lay_out = {...state.lay_out, detail: state.lay_out.detail.map( e => e.id === id ? {...e,detail:{...e.detail,position}} : e  )}
        },
        delLeftBox(state){
            const detail = state.lay_out.detail
            const minLeft = detail.reduce((min, box) => (box.detail.position.left < min ? box.detail.position.left : min), detail[0].detail.position.left);
            state.lay_out = {...state.lay_out, detail: detail.filter((box) => box.detail.position.left !== minLeft)};
        },
        setRect(state,action){
            state.lay_out.rect = action.payload
        },
    }
})

export const centerAction = centerSlice.actions;
export default centerSlice.reducer;