import {
    deleteArticleRequest,
    getAllArticlesLoginRequest,
    getAllArticlesRequest,
    setNewArticleRequest,
    updateArticleRequest
} from "../../api/apiCalls"
import {
    deleteMyArticleFail,
    deleteMyArticleSuccess,
    getAllArticlesFail,
    getAllArticlesSuccess,
    setNewArticleFail,
    setNewArticleSuccess,
    updateMyArticleFail,
    updateMyArticleSuccess
} from "../actions/articleActions"

export const getAllArticlesLogin = (token) => {
    return async (dispatch) => {
        const { response, error } = await getAllArticlesLoginRequest(token)
        if (error) {
            return dispatch(getAllArticlesFail(error))
        }
        dispatch(getAllArticlesSuccess(response.data))
    }
}

export const getAllArticles = () => {
    return async (dispatch) => {
        const { response, error } = await getAllArticlesRequest()
        if (error) {
            return dispatch(getAllArticlesFail(error))
        }
        dispatch(getAllArticlesSuccess(response.data))
    }
}

export const setNewArticle = (article, token) => {
    return async (dispatch) => {
        const { response, error } = await setNewArticleRequest(article, token)
        if (error) {
            return dispatch(setNewArticleFail(error))
        }

        dispatch(setNewArticleSuccess(response.data))
    }
}

export const deleteArticle = (slug, token) => {
    return async (dispatch) => {
        const { error } = await deleteArticleRequest(slug, token)
        if (error) {
            return dispatch(deleteMyArticleFail(error))
        }
        dispatch(deleteMyArticleSuccess(slug))
    }
}

export const updateArticle = (slug, values, token) => {
    return async (dispatch) => {
        const { response, error } = await updateArticleRequest(slug, values, token)
        if (error) {
            return dispatch(updateMyArticleFail(error))
        }
        dispatch(updateMyArticleSuccess(response.data))
    }
}
