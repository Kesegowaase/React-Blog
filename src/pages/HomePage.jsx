import React, { useEffect, useState } from 'react'
import { getAllArticles, getAllArticlesLogin } from '../redux/effects/articleEffects'
import { useDispatch, useSelector } from 'react-redux'
import Feed from '../components/Feed'
import Tag from '../components/Tag'
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import Pagination from '../components/Pagination'

const HomePage = () => {

    const dispatch = useDispatch()


    const { articlesStore, isLoggedIn, username, token } = useSelector((store) => {
        return {
            articlesStore: store.articleReducer.articles,
            isLoggedIn: store.authReducer.isLoggedIn,
            username: store.authReducer.username,
            token: store.authReducer.token
        }
    })

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState()
    const [articles, setArticles] = useState([])
    const [loginArticles, setLoginArticles] = useState([])
    const [global, setGlobal] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 1,
        postsPerPage: 20
    })
    const [currentPosts, setCurrentPosts] = useState([])


    const selectTag = (tag) => {
        if (isLoggedIn) {
            if (global) {
                setCurrentPosts([])
                setSelectedTag(tag)
                articlesStore.forEach((element) => {
                    if (element.tagList.includes(tag)) {
                        setCurrentPosts((prev) => {
                            return [
                                ...prev,
                                element
                            ]
                        })
                    }
                })
            }
            else {
                setCurrentPosts([])
                setSelectedTag(tag)
                articlesStore.forEach((element) => {
                    if (element.tagList.includes(tag) && element.author.username === username) {
                        setCurrentPosts((prev) => {
                            return [
                                ...prev,
                                element
                            ]
                        })
                    }
                })
            }
        }
        else {
            setArticles([])
            setSelectedTag(tag)
            articlesStore.forEach((element) => {
                if (element.tagList.includes(tag)) {
                    setArticles((prev) => {
                        return [
                            ...prev,
                            element
                        ]
                    })
                }
            })
        }

    }


    useEffect(() => {
        if (global) {
            setLoginArticles(articlesStore)
        }
        else {
            setLoginArticles([])
            articlesStore.forEach((element) => {
                if (element.author.username === username) {
                    setLoginArticles((prev) => {
                        return [
                            ...prev,
                            element
                        ]
                    })
                }
            })
        }
    }, [articlesStore, global, username])


    const onClickMyArticles = () => {
        setGlobal(false)
        setLoginArticles([])
        articlesStore.forEach((element) => {
            if (element.author.username === username) {
                setLoginArticles((prev) => {
                    return [
                        ...prev,
                        element
                    ]
                })
            }
        })
    }

    const onClickGlobalArticles = () => {
        setGlobal(true)
        setLoginArticles([])
        setLoginArticles(articlesStore)
    }

    const removeTag = () => {
        setSelectedTag()
        if (isLoggedIn) {
            if (global) {
                setCurrentPosts(articlesStore)
            }
            else {
                setCurrentPosts([])
                articlesStore.forEach((element) => {
                    if (element.author.username === username) {
                        setCurrentPosts((prev) => {
                            return [
                                ...prev,
                                element
                            ]
                        })
                    }
                })
            }
        }
        else {
            setArticles(articlesStore)
        }

    }

    const paginate = pageNum => {
        setPagination(prev => {
            return {
                ...prev,
                currentPage: pageNum
            }
        })
    };

    const nextPage = () => {
        setPagination((prev) => {
            return {
                ...prev,
                currentPage: prev.currentPage + 1
            }
        })
    };

    const prevPage = () => {
        setPagination((prev) => {
            return {
                ...prev,
                currentPage: prev.currentPage - 1
            }
        })
    }

    useEffect(() => {
        const indexOfLastPost = pagination.currentPage * pagination.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - pagination.postsPerPage;
        setCurrentPosts(loginArticles.slice(indexOfFirstPost, indexOfLastPost));
    }, [pagination.postsPerPage, pagination.currentPage, loginArticles, global, pagination])


    //find tags if articles store is changed
    useEffect(() => {
        setArticles(articlesStore)
        articlesStore.forEach((element) => {
            element.tagList.forEach((element) => {
                setTags((prev) => {
                    if (!prev.includes(element)) {
                        return [
                            ...prev,
                            element
                        ]
                    }
                    else {
                        return [
                            ...prev
                        ]
                    }

                })
            })
        })
    }, [articlesStore])

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getAllArticlesLogin(token))
        }
        else {
            dispatch(getAllArticles())
        }
        setArticles(articlesStore)
    }, [isLoggedIn, token])


    useEffect(() => {
    }, [tags, setTags, selectedTag, loginArticles, setLoginArticles,
        global, setGlobal, setSelectedTag])

    const { t } = useTranslation(["home"])
    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-9'>
                        {!isLoggedIn &&
                            articles.map((element, index) => {
                                return (
                                    <Feed element={element} index={index} articles={articles[index]} key={index} />
                                )
                            })
                        }
                        {isLoggedIn &&
                            <>
                                <Nav variant="tabs" className='mt-4'>
                                    <Nav.Item>
                                        <Nav.Link onClick={onClickMyArticles} eventKey="link-1">{t("Your Feed")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={onClickGlobalArticles} eventKey="link-2">{t("Global Feed")}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {currentPosts?.length > 0 ? currentPosts.map((element, index) => {
                                    return (
                                        <Feed element={element} index={index} articles={currentPosts[index]} key={index} />
                                    )
                                }) :
                                    <div className='mt-4 fs-2'>{t("There is no articles")}</div>
                                }
                                {!selectedTag && loginArticles.length > 20 &&
                                    <Pagination postsPerPage={pagination.postsPerPage} totalPosts={loginArticles.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} pagination={pagination} />
                                }
                            </>

                        }
                    </div>
                    <div className='col-md-3'>
                        <Tag tags={tags} selectTag={selectTag} />
                        <button onClick={removeTag} type="button" className="btn btn-danger m-1">{t("Reset Tag")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage