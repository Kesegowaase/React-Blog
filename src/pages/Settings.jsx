import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import TextArea from '../components/TextArea'
import { logoutSuccess, setUserNewImage } from '../redux/actions/authActions'
import TextField from '../components/TextField'
import { updateUserSettings } from '../redux/effects/authEffects'

const Settings = () => {

    const dispatch = useDispatch()

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/@${username}`;
        navigate(path);
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const { username, email, image, bio, token, store } = useSelector((store) => {
        return {
            username: store.authReducer.username,
            email: store.authReducer.email,
            image: store.authReducer.image,
            bio: store.authReducer.bio,
            token: store.authReducer.token,

        }
    })

    const onClickLogout = () => {
        dispatch(logoutSuccess());
    }

    useEffect(() => {

    }, [image, store])

    const numericRegex = /(?=.*[0-9])/
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const specialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
    const urlRegex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi

    const { t } = useTranslation(["settings"])
    const validate = Yup.object({
        image: Yup.string()
            .matches(urlRegex, t('It is not valid URL'))
            .nullable(),
        username: Yup.string()
            .max(16, t("Username must be less than 16 characters"))
            .min(8, t('Username must be more than 8 characters'))
            .required(t('Required')),
        bio: Yup.string()
            .min(50, t('Bio must be more than 50 characters'))
            .nullable(),
        email: Yup.string()
            .matches(mailRegex, t('Email is invalid'))
            .email(t('Email is invalid'))
            .required(t('Required')),
        password: Yup.string()
            .matches(numericRegex, t('At least one numeric digit required'))
            .matches(specialCharacters, t('At least one special character required'))
            .max(15, t('Password must be less than 15 characters'))
            .min(7, t('Password must be more than 7 characters')),
    })
    return (
        <div className='container mt-3 mb-5 '>
            <div className=''>
                <Formik
                    initialValues={{
                        image: image,
                        username: username,
                        bio: bio,
                        email: email,
                        password: "",
                    }}
                    validationSchema={validate}
                    onSubmit={async values => {
                        setButtonDisabled(true);
                        if (values.image) {
                            await dispatch(setUserNewImage(values.image))
                        }
                        await dispatch(updateUserSettings({ "user": values }, token))
                        setButtonDisabled(false);
                        routeChange()
                    }}
                >
                    {formik => (
                        <div>
                            <h1 className='text-center my-4 font-weight-bold-display-4'>{t("Your Settings")}</h1>

                            <Form>
                                <TextField label={t("URL of profile picture")} name="image" type="url" />
                                <TextField label={t("Username")} name="username" type="text" />
                                <TextArea label={t("Short bio about you")} name="bio" type="text" />
                                <TextField label={t("Email")} name="email" type="email" />
                                <TextField label={t("New Password")} name="password" type="password" />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <button disabled={buttonDisabled} className={`btn btn-secondary mt-3 col-md-3`} type="submit">{t("Update Settings")}</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
                <hr />
                <Link to="/" onClick={onClickLogout} className='btn btn-danger mt-3 col-md-3' >{t("Or click here to logout")}</Link >
            </div>
        </div>
    )
}

export default Settings