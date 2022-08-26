import {
    deleteCommentRequest,
    deleteFollowUserRequest,
    followArticleRequest,
    getCommentsLoginRequest,
    getCommentsRequest,
    getProfileLoginRequest,
    getProfileRequest,
    postCommentRequest,
    postFollowUserRequest,
    postSingupRequest,
    unfollowArticleRequest,
} from "./apiCalls";

//Signup
export const postSignupEffect = (values) => {
    const users = { "user": values }
    const response = postSingupRequest(users)
    return response.then(response => {
        return response
    }).catch(error => {
        return (error.response)
    })
}


export const getProfile = (username) => {
    const response = getProfileRequest(username)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const getProfileLogin = (username, token) => {
    const response = getProfileLoginRequest(username, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const postFollowUser = (username, token) => {
    const response = postFollowUserRequest(username, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const deleteFollowUser = (username, token) => {
    const response = deleteFollowUserRequest(username, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}


export const getComment = (slug) => {
    const response = getCommentsRequest(slug)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const getCommentLogin = (slug, token) => {
    const response = getCommentsLoginRequest(slug, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const postComment = (slug, data, token) => {
    const response = postCommentRequest(slug, data, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const deleteComment = (slug, id, token) => {
    const response = deleteCommentRequest(slug, id, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const unfollowArticle = (slug, token) => {
    const response = unfollowArticleRequest(slug, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const followArticle = (slug, token) => {
    const response = followArticleRequest(slug, token)
    return response.then(response => {
        return response
    }).catch(error => {
        return error
    })
}

