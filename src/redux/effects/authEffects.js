import { postSigninRequest, updateUserRequest } from "../../api/apiCalls"
import { getSigninCodesFail, getSigninCodesSuccess, setNewValuesFail, setNewValuesSuccess } from "../actions/authActions"



export const postSignin = (user) => {
    return async (dispatch) => {
        const { response, error } = await postSigninRequest(user)
        if (error) {
            return dispatch(getSigninCodesFail(error))
        }

        dispatch(getSigninCodesSuccess(response.data))
    }
}

export const updateUserSettings = (user, token) => {
    return async (dispatch) => {
        const { response, error } = await updateUserRequest(user, token)
        if (error) {
            return dispatch(setNewValuesFail(error))
        }

        dispatch(setNewValuesSuccess(response.data))
    }
}