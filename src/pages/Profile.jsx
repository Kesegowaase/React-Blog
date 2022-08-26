import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { useSelector } from 'react-redux'
import Feed from '../components/Feed';
import { useTranslation } from 'react-i18next';

const Profile = () => {

    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [articles, setArticles] = useState([])
    const [onMyArticles, setOnMyArticles] = useState(true)
    const [onMyFavoritedArticles, setOnMyFavoritedArticles] = useState(false)

    const { articlesStore } = useSelector((store) => {
        return {
            articlesStore: store.articleReducer.articles,
        }
    })
    const onClickMyArticles = () => {
        setOnMyArticles(true)
        setOnMyFavoritedArticles(false)
        setArticles([])
        articlesStore.forEach((element) => {
            if (element.author.username === pathUsername) {
                setArticles((prev) => {
                    return [
                        ...prev,
                        element
                    ]
                })
            }
        })
    }

    const onClickMyFavoritedArticles = () => {
        setOnMyArticles(false)
        setOnMyFavoritedArticles(true)
        setArticles([])
        articlesStore.forEach((element) => {
            if (element.favorited && element.author.username !== pathUsername) {
                setArticles((prev) => {
                    return [
                        ...prev,
                        element
                    ]
                })
            }
        })
    }

    useEffect(() => {
        if (onMyArticles) {
            setArticles([])
            articlesStore.forEach((element) => {
                if (element.author.username === pathUsername) {
                    setArticles((prev) => {
                        return [
                            ...prev,
                            element
                        ]
                    })
                }
            })
        }
        else if (onMyFavoritedArticles) {
            setArticles([])
            articlesStore.forEach((element) => {
                if (element.favorited && element.author.username !== pathUsername) {
                    setArticles((prev) => {
                        return [
                            ...prev,
                            element
                        ]
                    })
                }
            })
        }
    }, [articlesStore, onMyArticles, onMyFavoritedArticles, pathUsername])


    useEffect(() => {
    }, [articles])

    const { t } = useTranslation(["profile"])

    return (
        <>
            <ProfileCard />
            <div className='container'>
                <Nav variant="tabs" className='mt-4'>
                    <Nav.Item>
                        <Nav.Link onClick={onClickMyArticles} active={onMyArticles} eventKey="link-1">{t("My Articles")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={onClickMyFavoritedArticles} active={onMyFavoritedArticles} eventKey="link-2">{t("Favorited Articles")}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className='container'>
                {articles.length === 0 && <div className='mt-4 fs-2'>{t("There is no articles")}</div>}
                {articles.length > 0 && articles.map((element, index) => {
                    return (
                        <Feed element={element} index={index} articles={articles[index]} key={index} />
                    )
                })}
            </div>

        </>
    )
}

export default Profile