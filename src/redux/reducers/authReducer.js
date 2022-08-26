import * as ACTION from '../actions/Constants'

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    image: "https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif",
    token: undefined,
    bio: undefined,
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.user.email,
                username: action.payload.user.username,
                token: action.payload.user.token,
                bio: action.payload.user.bio,
                isLoggedIn: true
            }
        case ACTION.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ACTION.LOGOUT_SUCCESS:
            return {
                defaultState
            }

        case ACTION.NEW_VALUES_SUCCESS:
            return {
                ...state,
                email: action.payload.user.email,
                username: action.payload.user.username,
                bio: action.payload.user.bio,
                token: action.payload.user.token,
            }
        case ACTION.NEW_VALUES_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ACTION.SET_USER_NEW_IMAGE:
            return {
                ...state,
                image: action.payload,
            }
        default:
            return state
    }
}


export default authReducer