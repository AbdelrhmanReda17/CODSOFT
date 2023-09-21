import * as api from './api';
import { userLogin } from "./authSlice.js";
import { endLoading, resetError, sendError, startLoading } from "./appSlice.js";


export const signin = (formData ) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try{
            const { data } = await api.signIn(formData);
            dispatch(userLogin(data));
            dispatch(endLoading());
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }catch(error){
            dispatch(sendError( error.response?.data?.message))
            setTimeout(() => {
                dispatch(resetError());
              }, 1500);
        }
    }
}
export const signup = (formData ) => {
    return async (dispatch) => {
      dispatch(startLoading());
      try{
        const { data } = await api.signUp(formData);
        dispatch(userLogin(data));
        dispatch(endLoading());
        setTimeout(() => {
            window.location.reload();
        }, 1500);
      }catch(error){
        dispatch(sendError( error.response?.data?.message))
        setTimeout(() => {
            dispatch(resetError());
        }, 1500);
    }
    };
}