import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,CLEAR_ERRORS,
    USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL


  } from '../Constants/UserConstant'


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      
        case USER_LOGIN_REQUEST: 
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST: 
        return {
          loading: true,
          isAuthenticated: false,
        };
      case USER_LOGIN_SUCCESS:
      case USER_REGISTER_SUCCESS:
      case  LOAD_USER_SUCCESS: 
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case  USER_LOGIN_FAIL:
      case USER_REGISTER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
        case LOAD_USER_FAIL:
          return{
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,          };
        case CLEAR_ERRORS:
            return{
                ...state,
                error : null,
            };
        default:
            return state;
    }
    }








    