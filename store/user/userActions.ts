import { Dispatch } from 'redux';
import { CREATE_USER, UserInterface, UPDATE_STORE_USER } from './userTypes';

export const createUser = (user: UserInterface) => {
    const { email, phoneNumber, firstName, lastName, authId } = user
    return async (dispatch: Dispatch) => {
        const response = await fetch("https://kollexapp.firebaseio.com/users.json",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    authId: authId
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
                phoneNumber,
                authId
            }
        });
    }
}

export const getUser = (userId: string): any => {
    return async (dispatch: any) => {
        try {
            const response = await fetch(`https://kollexapp.firebaseio.com/users.json`)

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            for (let key in resData) {
                const { email, firstName, lastName, phoneNumber, authId } = resData[key]
                if (authId === userId) {
                    dispatch({
                        type: UPDATE_STORE_USER,
                        userData: {
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                        }
                    });
                }
            }




        }
        catch (err) {
            throw err;
        }
    }
}