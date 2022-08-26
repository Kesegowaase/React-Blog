import * as ACTIONS from './Constants'

//logout
export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}

//Signin Success
export const getSigninCodesSuccess = (user) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: user
    }
}

//Signin Fail
export const getSigninCodesFail = (user) => {
    return {
        type: ACTIONS.LOGIN_FAIL,
        payload: user
    }
}

//settings success
export const setNewValuesSuccess = (user) => {
    return {
        type: ACTIONS.NEW_VALUES_SUCCESS,
        payload: user
    }
}

//settings fail
export const setNewValuesFail = (user) => {
    return {
        type: ACTIONS.NEW_VALUES_FAIL,
        payload: user
    }
}

//image
export const setUserNewImage = (image) => {
    return {
        type: ACTIONS.SET_USER_NEW_IMAGE,
        payload: image
    }
}