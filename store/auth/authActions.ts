import { UserInterface } from './../user/userTypes';
import { createUser, getUser } from './../user/userActions';
import { AUTHENTICATE, LOGOUT } from './authTypes';
import AsyncStorage from '@react-native-community/async-storage';

let timer: number;

export const authenticate = (userId: string, token: string, expiryTime: number) => {
    return (dispatch: any) => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        })
    }
}

export const signUpAndSave = (user: UserInterface) => {
    const { email, password } = user
    return async (dispatch: any) => {
        // for test purposes I will keep the key in the link, however it should be move into an env file when in development and production
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeslVPBytVBFia6mFv0ISARuDhMoq7-tU",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureScreen: true
                })
            })

        const resData = await response.json()
        if (!response.ok) {
            const errorId = resData.error.message
            let message = "Something went wrong!"

            if (errorId === "EMAIL_EXISTS") {
                message = "This email already exists."
            }

            throw new Error(message)
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        dispatch(createUser({ ...user, authId: resData.localId }))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)


    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        // for test purposes I will keep the key in the link, however it should be move into an env file when in development and production
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeslVPBytVBFia6mFv0ISARuDhMoq7-tU",
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        const resData = await response.json()

        if (!response.ok) {
            const errorId = resData.error.message
            let message = "Something went wrong!"

            if (errorId === "EMAIL_NOT_FOUND") {
                message = "This email could not be found."
            } else if (errorId === "INVALID_PASSWORD") {
                message = "This password is not valid."
            }
            throw new Error(message)
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        dispatch(getUser(resData.localId))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)

    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem("userData")
    return {
        type: LOGOUT
    }
}

const saveDataToStorage = (token: string, userId: string, expirationDate: Date) => {
    AsyncStorage.setItem("userData", JSON.stringify({ token: token, userId: userId, expireDate: expirationDate.toISOString() }))
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = (expirationTime: number) => {
    return (dispatch: any) => {
        timer = setTimeout(() => {
            dispatch(logout)
        }, expirationTime)
    }
}