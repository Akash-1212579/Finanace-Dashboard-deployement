import { createSlice } from "@reduxjs/toolkit"

const userToken = sessionStorage.getItem("token");
const userData = sessionStorage.getItem("user");
const initialState ={
   
    user : userData?JSON.parse(userData) : null,
    token : userToken || null,
    isAuthenticated : Boolean(userToken),
    loading : false,
    error : null
}
const authSlice = createSlice({
    initialState,
    name : "auth",
    reducers : {
        authStart(state){
          state.loading =true;
          state.error = null;
        },
        authSuccess(state,action){
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        authFaillure(state,action){
            state.loading = false;
            state.error = action.payload;
            console.log("error from loginFaillure is",state.error);
        },
        logout(state){
            state.user = null;
            state.token = null;
            state.isAuthenticated = null;
        }
    }
});

export const{authStart,authSuccess,authFaillure,logout} = authSlice.actions;
export default authSlice.reducer;