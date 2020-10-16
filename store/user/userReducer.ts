import { CREATE_USER } from './userTypes';


const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                email: action.userData.email,
                phoneNumber: action.userData.phoneNumber,
            }
        default:
            return state
    }
}