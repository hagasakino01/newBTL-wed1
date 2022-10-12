import { createSlice } from "@reduxjs/toolkit";


const initialState={
    listBook:[],
    
}
export const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{
        getListBook:(state, action)=>{
            state.listBook=action.payload
        },
        
    }

})
export const { getListBook,getLogin,getLogout}= homeSlice.actions
export default homeSlice.reducer;