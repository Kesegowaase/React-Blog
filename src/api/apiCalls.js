import axios from "axios";

//for login
export const postSigninRequest = (data) => {
    return axios.post("https://api.realworld.io/api/users/login", data).then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}

//for register
export const postSingupRequest = (data) => {
    return axios.post("https://api.realworld.io/api/users", data)
}

//for update user
export const updateUserRequest = (data, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.put("https://api.realworld.io/api/user", data, config).then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}

//create an article new
export const setNewArticleRequest = (article, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.post("https://api.realworld.io/api/articles", article, config).then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}


//article login feed new
export const getAllArticlesLoginRequest = (token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.get("https://api.realworld.io/api/articles?limit=100&offset=0", config).then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}

//article feed new
export const getAllArticlesRequest = () => {
    return axios.get("https://api.realworld.io/api/articles?limit=100&offset=0").then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}

//get bio vs
export const getProfileRequest = (username) => {
    return axios.get(`https://api.realworld.io/api/profiles/${username}`)
}

//get bio login vs
export const getProfileLoginRequest = (username, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.get(`https://api.realworld.io/api/profiles/${username}`, config)
}

//follow user
export const postFollowUserRequest = (username, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, "", config)
}

//unfollow user
export const deleteFollowUserRequest = (username, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`, config)
}

//get comments
export const getCommentsRequest = (slug) => {
    return axios.get(`https://api.realworld.io/api/articles/${slug}/comments`)
}

//get comments
export const getCommentsLoginRequest = (slug, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.get(`https://api.realworld.io/api/articles/${slug}/comments`, config)
}

//post comment
export const postCommentRequest = (slug, data, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, data, config)
}

export const deleteCommentRequest = (slug, id, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, config)
}

//delete Article
export const deleteArticleRequest = (slug, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.delete(`https://api.realworld.io/api/articles/${slug}`, config)
}

//update Article
export const updateArticleRequest = (slug, values, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.put(`https://api.realworld.io/api/articles/${slug}`, values, config).then(response => {
        return ({ response: response, error: null })
    }).catch((error) => {
        return ({ response: null, error })
    }).then(response => response)
}

//unfollow article
export const unfollowArticleRequest = (slug, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, config)
}

//follow article
export const followArticleRequest = (slug, token) => {
    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    return axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, "", config)
}
