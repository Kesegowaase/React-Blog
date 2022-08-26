import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteComment, deleteFollowUser, followArticle, getComment, getCommentLogin, postComment, postFollowUser, unfollowArticle } from '../api/apiEffects';
import { articleFavorite, followUser } from '../redux/actions/articleActions';
import { deleteArticle } from '../redux/effects/articleEffects';

const ArticleComment = ({ article, setFollowing, following }) => {

    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState();

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

    const deleteCommentHandler = async (id) => {
        await deleteComment(article.slug, id, token).then(resp => {
            if (resp.status === 200) {
                const updatedComments = comments.filter(element => {
                    return element.id !== id
                })
                setComments(updatedComments)
            }
        })
    }

    const postCommentHandler = async () => {
        if (isLoggedIn) {
            await postComment(article.slug, { "comment": { "body": comment } }, token).then((resp) => {
                setComments((prev) => {
                    return [
                        ...prev,
                        resp.data.comment
                    ]
                })
            })
            setComment("")
        }
        else {
            routeChangeToLogin()
        }
    }

    const onChangeComment = (event) => {
        setComment(event.target.value)
    }

    useEffect(() => {
        if (isLoggedIn) {
            const resp = async () => {
                await getCommentLogin(article.slug, token).then(response => {
                    setComments(response.data.comments)
                })
            }
            resp()
        }
        else {
            const resp = async () => {
                await getComment(article.slug).then(response => {
                    setComments(response.data.comments)
                })
            }
            resp()
        }
    }, [token, article.slug, isLoggedIn])

    useEffect(() => {
        setLike(article.favorited)
    }, [article.favorited])

    useEffect(() => {
    }, [article, comments, comment])

    const { t } = useTranslation(["showArticle"])
    return (
        <div className='container'>
            <hr />
            <div className='row'>
                <div className='col-md-6'>
                    <div className="row">
                        <img alt='user' className='p-1 rounded-circle' style={{ width: "5rem" }} src={article.author.image} />
                        <div className='col-md-6'>
                            <Link to={`/@${article.author.username}`}><h4 className='text-dark'>{article.author.username}</h4></Link>
                            <p className='text-secondry text-dark'>{new Date(article.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={{ float: "right" }}>
                        {username === article.author.username ? <button type="button" onClick={updateHandler} className='btn btn-info me-2'>{t("Edit Article")}</button > :
                            <button className={`btn btn-outline-dark me-2 ${following && "bg-danger"}`} onClick={followHandler} type="button">{following ? t("Unfollow") : t("Follow")} {article.author.username}</button>}
                        {username === article.author.username ? <button onClick={deleteHandler} className="btn btn-danger" type="button">{t("Delete Article")}</button > :
                            <button className={`btn btn-outline-dark ${article.favorited && "bg-danger"}`} onClick={() => likeButton()} type="button">{article.favorited ? t(`Unfavorite Article`) : t("Favorite Article")} {article.favoritesCount}</button>}

                    </div>
                </div>
            </div>
            <div className="row mt-4 ">
                <div className="card-footer py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="d-flex flex-start w-100">
                        <div className="form-outline w-100 p-3">
                            <textarea className="form-control" id="textAreaExample" rows="4"
                                value={comment}
                                onChange={onChangeComment}
                                style={{ background: "#fff" }}></textarea>
                        </div>
                    </div>
                    <div className="float-end me-2 pe-2">
                        <button type="button" disabled={!comment} onClick={() => postCommentHandler()} className="btn btn-primary btn-sm">{t("Post comment")}</button>
                    </div>
                </div>
            </div>
            {comments.length > 0 &&
                comments.map((element, index) => {
                    return (
                        <div className="row mt-4 mb-4 p-2" key={index}>
                            <div className="card-footer py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
                                <div className="d-flex flex-start">
                                    <div className="form-outline ms-2">
                                        {element.body}
                                    </div>
                                </div>
                                <div className=" mt-2 pt-1 ms-2">
                                    <div className="row">
                                        <img src={element.author?.image} className='p-1 rounded-circle ms-2' alt='user' style={{ width: "2rem", height: "2rem" }} />
                                        <div className="col-md-1">
                                            <p className='text-dark'>{article.author.username}</p>

                                        </div>
                                        <div className="col-md-1">
                                            <p className='text-secondry text-dark'>{new Date(article.updatedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-md-9">
                                            {username === element.author.username && <button type="button" onClick={() => deleteCommentHandler(element.id)} style={{ float: "right" }} className="btn btn-danger">{t("Delete Comment")}</button>}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArticleComment