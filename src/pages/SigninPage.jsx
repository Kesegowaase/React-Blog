import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import TextField from '../components/TextField'
import * as Yup from 'yup'
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from 'react-redux'
import { postSignin } from '../redux/effects/authEffects'
import { Link } from "react-router-dom";

const SigninPage = () => {

    const dispatch = useDispatch()

    const { store } = useSelector((store) => {
        return {
            store: store,
        }
    })

    const [error, setError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (store.authReducer?.error?.response.data.errors)
            setError(true)
    }, [store])

    const numericRegex = /(?=.*[0-9])/
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const specialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi

    const { t } = useTranslation(["signin"])
    const validate = Yup.object({
        email: Yup.string()
            .matches(mailRegex, t('Email is invalid'))
            .email(t('Email is invalid'))
            .required(t('Required')),
        password: Yup.string()
            .matches(numericRegex, t('At least one numeric digit required'))
            .matches(specialCharacters, t('At least one special character required'))
            .max(15, t('Password must be less than 15 characters'))
            .min(7, t('Password must be more than 7 characters'))
            .required(t('Required')),
    })
    return (
        <div className='container mt-3'>
            <div className='row justify-content-center align-items-center'>
                <div className='m-1 col-sm-8 col-md-6 col-lg-6 shadow-sm p-3 mb-5 bg-white border rounded '>
                    <h1 className='text-center my-4 font-weight-bold-display-4'>{t("Sign in")}</h1>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={validate}
                        onSubmit={async values => {
                            setButtonDisabled(true);
                            await dispatch(postSignin({ "user": values }))
                            setButtonDisabled(false);
                        }}
                    >
                        {formik => (
                            <div>
                                {error && <div className='text-center' style={{ color: "red" }}>{t("Is invalid!")}</div>}

                                <Form>
                                    <TextField label={t("Email")} name="email" type="email" />
                                    <TextField label={t("Password")} name="password" type="password" />
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button disabled={buttonDisabled} className='btn btn-secondary mt-3 col-md-3' type='submit'>{t("Sign in")}</button>
                                        <div >
                                            <Link to="/register">{t("Need an account ?")}</Link>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SigninPage