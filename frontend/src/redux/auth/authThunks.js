import { authFaillure, authStart, authSuccess } from "./authSlice"
import { loginUserService, registerUserSevice } from "./authService";
export const loginUser = (Credentials)=>async(dispatch)=>{

    dispatch(authStart());

    try {
        const res = await loginUserService(Credentials);
        dispatch(authSuccess(res));
        sessionStorage.setItem("token",res.token);
        sessionStorage.setItem("user",JSON.stringify(res.user));

    } catch (error) {
        const message ="Error occurred while login check credentials";
        dispatch(authFaillure(message));
    }
}


export const registerUser = (credentials)=> async (dispatch)=>{
    //console.log("register credentials are",credentials);

    try {
        const res = await registerUserSevice(credentials);
        dispatch(authSuccess(res));
        sessionStorage.setItem("token",res.token);
        sessionStorage.setItem("user",JSON.stringify(res.user));
    } catch (error) {
         const message ="Error occurred while Register check credentials";
         dispatch(authFaillure(message));
    }
}