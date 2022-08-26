import * as ACTION from '../actions/Constants'

const defaultState = {
    articles: [],
    articlesCount: 0,
}

const articleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION.GET_ALL_ARTICLES_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION.GET_ALL_ARTICLES_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ACTION.SET_NEW_ARTICLE_SUCCESS:
            return {
                articles: [action.payload.article, ...state.articles],
                articlesCount: state.articlesCount + 1
            }
        case ACTION.SET_NEW_ARTICLE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ACTION.ARTICLE_FAVORITE:
            const updatedArticles = state.articles.map(article => {
                if (article.slug === action.payload.slug) {
                    if (article.favorited) {
                        article.favoritesCount -= 1
                    }
                    else {
                        article.favoritesCount += 1
                    }
                    article.favorited = !article.favorited
                    return { ...article, ...action.payload }
                }
                return article
            })
            return {
                articles: updatedArticles
            }
        case ACTION.FOLLOW_USER:
            const updatedUsers = state.articles.map(article => {
                if (article.slug === action.payload.slug) {
                    article.author.following = !article.author.following
                    return { ...article, ...action.payload }
                }
                return article
            })
            return {
                articles: updatedUsers
            }
        case ACTION.DELETE_MY_ARTICLE_SUCCESS:
            const deleteArticle = state.articles.filter(article => {
                return article.slug !== action.payload
            })
            return {
                articlesCount: state.articlesCount - 1,
                articles: deleteArticle
            }
        case ACTION.DELETE_MY_ARTICLE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ACTION.UPDATE_MY_ARTICLE_SUCCESS:
            const updatedMyArticle = state.articles.map(article => {
                if (article.slug === action.payload.slug) {
                    return { ...article, ...action.payload }
                }
                return article
            })
            return {
                articles: updatedMyArticle
            }
        case ACTION.UPDATE_MY_ARTICLE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}


export default articleReducer