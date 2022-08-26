import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { articleFavorite, followUser } from '../redux/actions/articleActions';
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { deleteArticle } from '../redux/effects/articleEffects';
import { deleteFollowUser, followArticle, postFollowUser, unfollowArticle } from '../api/apiEffects';

const ArticleCard = ({ article, setFollowing, following }) => {

    const dispatch = useDispatch()

    let navigate = useNavigate();
    const routeChangeToLogin = () => {
        let path = `/login`;
        navigate(path);
    }
    const routeChangeToHome = () => {
        let path = `/`;
        navigate(path);
    }
    const routeChangeToEdit = () => {
        let path = `/editor/${article.slug}`;
        navigate(path);
    }
    const [like, setLike] = useState()

    const { isLoggedIn, username, token } = useSelector((store) => {
        return {
            isLoggedIn: store.authReducer.isLoggedIn,
            username: store.authReducer.username,
            token: store.authReducer.token
        }
    })

    const likeButton = async () => {
        if (isLoggedIn && like === false) {
            dispatch(articleFavorite(article))
            await followArticle(article?.slug, token).then(resp => {
                setLike(resp.data.article.favorited)
            })
        }
        else if (isLoggedIn && like === true) {
            dispatch(articleFavorite(article))
            await unfollowArticle(article?.slug, token).then(resp => {
                setLike(resp.data.article.favorited)
            })
        }
        else {
            routeChangeToLogin()
        }
    }

    const followHandler = async () => {
        if (isLoggedIn && following === false) {
            dispatch(followUser(article))
            await postFollowUser(article?.author.username, token).then(resp => {
                setFollowing(resp.data.profile.following)
            })
        }
        else if (isLoggedIn && following === true) {
            dispatch(followUser(article))
            await deleteFollowUser(article?.author.username, token).then(resp => {
                setFollowing(resp.data.profile.following)
            })
        }
        else {
            routeChangeToLogin()
        }
    }

    const deleteHandler = async () => {
        await dispatch(deleteArticle(article.slug, token))
        routeChangeToHome()
    }

    const updateHandler = () => {
        routeChangeToEdit()
    }

    useEffect(() => {
        setLike(article.favorited)
    }, [article.favorited])

    useEffect(() => {
    }, [article])

    const { t } = useTranslation(["showArticle"])
    return (
        <div className='container bg-dark mt-3 p-3'>
            <div className='row'>
                <div className='col-md-6'>
                    <h2 className='text-light'>{article.title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <img alt='user' className='p-1 rounded-circle' style={{ width: "5rem" }} src={article.author.image} />
                        <div className='col-md-6'>
                            <Link to={`/@${article.author.username}`}><h4 className='text-light'>{article.author.username}</h4></Link>
                            <p className='text-secondry text-light'>{new Date(article.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                    <div style={{ float: "right" }}>
                        {username === article.author.username ? <button type="button" onClick={updateHandler} className='btn btn-info me-2'>{t("Edit Article")}</button > :
                            <button className={`btn btn-outline-light me-2 ${following && "bg-danger"}`} onClick={followHandler} type="button">{following ? t("Unfollow") : t("Follow")} {article.author.username}</button>}
                        {username === article.author.username ? <button onClick={deleteHandler} className="btn btn-danger" type="button">{t("Delete Article")}</button > :
                            <button className={`btn btn-outline-light ${article.favorited && "bg-danger"}`} onClick={() => likeButton()} type="button">{article.favorited ? t("Unfavorite Article") : t("Favorite Article")} {article.favoritesCount}</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard