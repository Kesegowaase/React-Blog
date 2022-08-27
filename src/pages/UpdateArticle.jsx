import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldArray, Field } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from "react-i18next"
import TextArea from '../components/TextArea'
import TextField from '../components/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateArticle } from '../redux/effects/articleEffects'

const UpdateArticle = () => {

    const dispatch = useDispatch()

    const routeParams = useParams();
    const pathArticleSlug = routeParams.articleSlug;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }
    const [article, setArticle] = useState([])

    const { articlesStore, token } = useSelector((store) => {
        return {
            articlesStore: store.articleReducer.articles,
            token: store.authReducer.token
        }
    })

    useEffect(() => {
        articlesStore.forEach(element => {
            if (element.slug === pathArticleSlug) {
                setArticle(element)
            }
        });
    }, [articlesStore, pathArticleSlug])

    useEffect(() => {
    }, [article, articlesStore])


    const { t } = useTranslation(["updateArticle"])
    const validate = Yup.object({
        title: Yup.string()
            .required(t('Required'))
            .min(8, "Title must be more than 8 characters"),
        description: Yup.string()
            .min(8, t('Description must be more than 8 characters'))
            .required(t('Required')),
        body: Yup.string()
            .min(50, t('Article text must be more than 50 characters'))
            .required(t('Required')),
        tagList: Yup.array().of(Yup.string())
            .min(1, t('Required')),
        tag: Yup.string()
    })
    return (
        <div className='container mt-3 '>
            <div className=''>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        title: article?.title,
                        description: article?.description,
                        body: article?.body,
                        tagList: article?.tagList,
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        let updatedArticle = {
                            body: values.body,
                            description: values.description,
                            title: values.title,
                            slug: article?.slug,
                            tagList: values.tagList,
                        }
                        await dispatch(updateArticle(article.slug, { "article": updatedArticle }, token))
                        routeChange()
                    }}
                >
                    {formik => (
                        <div>
                            <Form>
                                <TextField label={t("Article Title")} name="title" type="text" />
                                <TextField label={t("Description")} name="description" type="text" />
                                <TextArea label={t("Write your article (in markdown)")} name="body" type="text" />
                                <FieldArray name="tagList"
                                    render={(array) => {
                                        return (
                                            <div>
                                                {
                                                    <>

                                                        <label htmlFor={"tagList"}>{t("Tag")}</label>
                                                        <Field name="tag"
                                                            className={`form-control shadow-none ${array.form.errors.tagList && "is-invalid"}`}
                                                            autoComplete='off'
                                                        />
                                                        <button type="button" className='btn btn-success col-md-2 mt-2 me-2' onClick={() => {
                                                            let tag = (array.form.values.tag)
                                                            array.form.values.tag = ""
                                                            return (
                                                                array.push(tag)
                                                            )
                                                        }}>
                                                            {t("Add a tag")}
                                                        </button>
                                                        <button type="button" className='btn btn-danger col-md-2 mt-2' onClick={() => {
                                                            let findIndex = null;
                                                            array.form.values.tagList.forEach((element, index) => {
                                                                if (array.form.values.tag === element)
                                                                    findIndex = index
                                                            });
                                                            array.form.values.tag = ""
                                                            return (
                                                                array.remove(findIndex)
                                                            )
                                                        }}>
                                                            {t("Remove a tag")}
                                                        </button>
                                                        {array?.form?.values?.tagList?.length > 0 &&
                                                            array.form.values.tagList.map((element, index) => {
                                                                return (
                                                                    <div className=' mt-3' key={index}>
                                                                        <span className='rounded-pill p-1 bg-secondary' >{element}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </>
                                                }
                                            </div>
                                        )
                                    }}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <button className={`btn btn-primary mt-3 col-md-3 `} type="submit">{t("Publish Article")}</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div >
        </div >
    )
}

export default UpdateArticle
