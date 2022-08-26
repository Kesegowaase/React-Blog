import React from 'react'

const ArticleBody = ({ article }) => {
    return (
        <div className='container'>
            <div className='row mt-2 p-2'>
                {article.description}
            </div>
            <div className='row mt-4 p-2'>
                {article.author.username && article.tagList.map((element, index) => {
                    return (
                        <p key={index} className='btn btn-outline-dark col-md-2'>{element}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticleBody