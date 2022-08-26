import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import ArticleBody from '../components/ArticleBody';
import ArticleComment from '../components/ArticleComment';
import { getProfile, getProfileLogin } from '../api/apiEffects';

const ShowArticle = () => {

    const routeParams = useParams();
    const articleSlug = routeParams.articleSlug
    const [articleFlag, setArticleFlag] = useState(false);
    const [following, setFollowing] = useState()

    const { articles, isLoggedIn, token } = useSelector((store) => {
        return {
            articles: store.articleReducer.articles,
            isLoggedIn: store.authReducer.isLoggedIn,
            token: store.authReducer.token
        }
    })

    const [article, setArticle] = useState({})


    useEffect(() => {
        articles.forEach((element) => {
            if (element.slug === articleSlug) {
                setArticle(element)
            }
        })
        setArticleFlag(true)

    }, [articles, articleSlug])

    useEffect(() => {
        if (isLoggedIn) {

            const getNewValues = async () => {
                await getProfileLogin(article?.author?.username, token).then(resp => {
                    setFollowing(resp.data.profile.following)
                })
            }
            getNewValues()
        }
        else {
            const getNewValues = async () => {
                await getProfile(article?.author?.username).then(resp => {
                    setFollowing(resp.data.profile.following)
                })
            }
            getNewValues()
        }
    }, [article?.author?.username, isLoggedIn, token, following])


    useEffect(() => {
    }, [article])

    return (

        <div>
            {articleFlag && <div>
                <ArticleCard article={article} setFollowing={setFollowing} following={following} />
                <ArticleBody article={article} />
                <ArticleComment article={article} setFollowing={setFollowing} following={following} />
            </div>
            }
        </div>
    )
}

export default ShowArticle