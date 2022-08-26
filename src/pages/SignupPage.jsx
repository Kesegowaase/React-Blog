import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import TextField from '../components/TextField'
import * as Yup from 'yup'
import { postSignupEffect } from '../api/apiEffects'
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"

const SignupPage = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    const { t } = useTranslation(["signup"])

    const [signpUpValidation, setSignpUpValidation] = useState({});
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const numericRegex = /(?=.*[0-9])/
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const specialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
    useEffect(() => {
        if (signpUpValidation.status === 200) {
            setEmailError(false);
            setUsernameError(false);
            routeChange();
        } else if (signpUpValidation.status === 422) {
            setEmailError(signpUpValidation.data.errors?.email ? true : false);
            setUsernameError(signpUpValidation.data.errors?.username ? true : false);
        }
    }, [signpUpValidation, emailError, usernameError]);

    const validate = Yup.object({
        username: Yup.string()
            .max(16, t("Username must be less than 16 characters"))
            .min(8, t('Username must be more than 8 characters'))
            .required(t('Required')),
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
                <div className='m-1 col-sm-8 col-md-6 col-lg-5 shadow-sm p-3 mb-5 bg-white border rounded mt-5' >
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: ""
                        }}
                        validationSchema={validate}
                        onSubmit={async values => {
                            setButtonDisabled(true);
                            await postSignupEffect(values).then(resp => {
                                setSignpUpValidation(resp);
                            });
                            setButtonDisabled(false);
                        }}
                    >
                        {formik => (
                            <div>
                                <h1 className='text-center my-4 font-weight-bold-display-4'>{t("Sign up")}</h1>

                                {emailError && <div className='text-center' style={{ color: "red" }}>{t("Email has been already used!")}</div>}
                                {usernameError && <div className='text-center' style={{ color: "red" }}>{t("Username has been already used!")}</div>}

                                <Form>
                                    <TextField label={t("Username")} name="username" type="text" />
                                    <TextField label={t("Email")} name="email" type="email" />
                                    <TextField label={t("Password")} name="password" type="password" />
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div><button disabled={buttonDisabled} className='btn btn-secondary  mt-3' type='submit'>{t("Sign up")}</button></div>

                                        <div><Link to='/login'>{t("Have an account ?")}</Link></div>
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

export default SignupPage