import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { deleteFollowUser, getProfile, getProfileLogin, postFollowUser } from '../api/apiEffects';
import { useTranslation } from 'react-i18next';


const ProfileCard = () => {
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [userProfile, setUserProfile] = useState({})
    const [following, setFollowing] = useState()

    let button;

    const { username, token, isLoggedIn } = useSelector((store) => {
        return {
            username: store.authReducer.username,
            token: store.authReducer.token,
            isLoggedIn: store.authReducer.isLoggedIn
        }
    })
    const { t } = useTranslation(["profile"])

    useEffect(() => {
        if (isLoggedIn) {
            const getNewValues = async () => {
                await getProfileLogin(pathUsername, token).then(resp => {
                    setUserProfile(resp.data.profile)
                })
            }
            getNewValues()
        }
        else {
            const getNewValues = async () => {
                await getProfile(pathUsername).then(resp => {
                    setUserProfile(resp.data.profile)
                })
            }
            getNewValues()
        }

    }, [pathUsername, isLoggedIn, token])

    useEffect(() => {
        setFollowing(userProfile.following)
    }, [userProfile])

    const followUser = async () => {
        await postFollowUser(pathUsername, token).then(resp => {
            setFollowing(resp.data.profile.following)
        })
    }

    const unfollowUser = async () => {
        await deleteFollowUser(pathUsername, token).then(resp => {
            setFollowing(resp.data.profile.following)
        })
    }

    if (pathUsername === username) {
        button = (
            <Link type="button" to="/settings" className="btn btn-primary btn-rounded btn-block btn-lg">{t("Edit Profile Settings")}</Link>
        )
    }
    else if ((pathUsername !== username) && !following) {
        button = (
            <button disabled={!isLoggedIn} onClick={followUser} className="btn btn-success btn-rounded btn-block btn-lg">{t("Follow")} {pathUsername}</button>
        )
    }
    else if ((pathUsername !== username) && following) {
        button = (
            <button onClick={unfollowUser} className="btn btn-danger btn-rounded btn-block btn-lg">{t("Unfollow")} {pathUsername}</button>
        )
    }


    return (
        <section style={{ backgroundcolor: "#eee" }}>
            <div className="container h-100 mt-3">
                <div className="row d-flex justify-content-center h-100">
                    <div className="">
                        <div className="" style={{ borderRadius: "15px", backgroundColor: "#93e2bb" }}>
                            <div className="card-body p-4 text-black">
                                <div className='text-center'>
                                    <h2 className="mb-4">{pathUsername}</h2>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                    </div>
                                </div>
                                <div className="align-items-center text-center mb-4">
                                    <div className="flex-shrink-0">
                                        <img src={userProfile.image}
                                            alt="user" className="rounded mx-auto d-block  mx-auto"
                                            style={{ width: "70px" }} />
                                    </div>
                                    <br />
                                    <p className='text-md-center fs-2'>{userProfile.bio}</p>
                                </div>
                                <hr />
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ProfileCard