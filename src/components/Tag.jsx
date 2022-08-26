import React from 'react'
import { useTranslation } from 'react-i18next'

const Tag = ({ tags, selectTag }) => {


    const { t } = useTranslation(["home"])
    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="text-md-start">{t("Popular Tags")}</h5>
                {
                    tags.map((element, index) => {
                        return (
                            <button onClick={() => selectTag(element)} key={index} type="button" className="btn btn-outline-dark m-1">{element}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tag