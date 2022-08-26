import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { articleFavorite } from '../redux/actions/articleActions'
import { followArticle, unfollowArticle } from '../api/apiEffects'
import { useTranslation } from 'react-i18next'

const Feed = ({ element, index, articles }) => {

    const dispatch = useDispatch()

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    const { isLoggedIn, username, token } = useSelector((store) => {
        return {
            isLoggedIn: store.authReducer.isLoggedIn,
            username: store.authReducer.username,
            token: store.authReducer.token
        }
    })

    const [like, setLike] = useState()

    const likeButton = async () => {
        if (isLoggedIn && like === false) {
            dispatch(articleFavorite(articles))
            await followArticle(articles?.slug, token).then(resp => {
                setLike(resp.data.article.favorited)
            })
        }
        else if (isLoggedIn && like === true) {
            dispatch(articleFavorite(articles))
            await unfollowArticle(articles?.slug, token).then(resp => {
                setLike(resp.data.article.favorited)
            })
        }
        else {
            routeChange()
        }
    }

    useEffect(() => {
        setLike(articles.favorited)
    }, [articles.favorited])
    const { t } = useTranslation(["home"])
    return (
        <div className='p-3 mt-4 mb-4' style={{ border: "1px solid #1EBBA3" }} key={index}>
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <img alt='user' className='img-thumbnail p-1 rounded-circle' style={{ width: "5rem" }} src={articles?.author.image} />
                        <div className="col-md-6">
                            <Link to={`/@${articles.author.username}`}><h4>{articles.author.username}</h4></Link>
                            <p className='text-secondry'>{new Date(articles.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 justify-content-end">
                    <div style={{ float: "right" }}>
                        {articles.author.username !== username && <button type="button" onClick={() => likeButton()} className={`btn btn-success ${articles.favorited && "btn-danger text-light"}`}>{articles.favorited ? t("Unfavorite Article") : t("Favorite Article")}  {articles.favoritesCount}</button>}
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <Link to={`/article/${articles.slug}`}> <h3>{articles.title}</h3></Link>
                <p>{articles.description}</p>
            </div>
            <div className='row'>
                <div className='col-md-12 justify-content-end'>
                    {element.tagList.map((element, index) => {
                        return (
                            <button key={index} type="button" style={{ float: "right" }} className="btn btn-outline-dark ms-2">{element}</button>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Feed