import * as ACTIONS from './Constants'

export const getAllArticlesSuccess = (payload) => {
    return {
        type: ACTIONS.GET_ALL_ARTICLES_SUCCESS,
        payload
    }
}

export const getAllArticlesFail = (payload) => {
    return {
        type: ACTIONS.GET_ALL_ARTICLES_FAIL,
        payload
    }
}

export const setNewArticleFail = (payload) => {
    return {
        type: ACTIONS.SET_NEW_ARTICLE_FAIL,
        payload
    }
}

export const setNewArticleSuccess = (payload) => {
    return {
        type: ACTIONS.SET_NEW_ARTICLE_SUCCESS,
        payload
    }
}

export const articleFavorite = (payload) => {
    return {
        type: ACTIONS.ARTICLE_FAVORITE,
        payload
    }
}

export const followUser = (payload) => {
    return {
        type: ACTIONS.FOLLOW_USER,
        payload
    }
}

export const deleteMyArticleSuccess = (payload) => {
    return {
        type: ACTIONS.DELETE_MY_ARTICLE_SUCCESS,
        payload
    }
}

export const deleteMyArticleFail = (payload) => {
    return {
        type: ACTIONS.DELETE_MY_ARTICLE_FAIL,
        payload
    }
}

export const updateMyArticleSuccess = (payload) => {
    return {
        type: ACTIONS.UPDATE_MY_ARTICLE_SUCCESS,
        payload
    }
}

export const updateMyArticleFail = (payload) => {
    return {
        type: ACTIONS.UPDATE_MY_ARTICLE_FAIL,
        payload
    }
}

