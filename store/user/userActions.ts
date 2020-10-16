import { Dispatch } from 'redux';
import { CREATE_USER } from './userTypes';

export const createUser = (firstName: string, lastName: string, email: string, phoneNumber: number) => {
    return async (dispatch: Dispatch) => {
        const response = await fetch("https://kollexapp.firebaseio.com/users.json",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber
                })
            })

        const resData = await response.json();

        dispatch({
            type: CREATE_USER,
            userData: {
                id: resData.name,
                firstName,
                lastName,
                email,
                phoneNumber
            }
        });
    }
}