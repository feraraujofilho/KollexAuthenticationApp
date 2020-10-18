import { LOGOUT } from './../auth/authTypes';
import { CREATE_USER, UPDATE_STORE_USER } from './userTypes';


const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    authId: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                email: action.userData.email,
                phoneNumber: action.userData.phoneNumber,
                authId: action.userData.authId
            }
        case UPDATE_STORE_USER: {
            return {
                ...state,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                email: action.userData.email,
                phoneNumber: action.userData.phoneNumber
            }
        }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}