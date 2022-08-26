import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate, nextPage, prevPage, pagination }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pagination.currentPage !== 1 &&
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => prevPage()}>Previous</a>
                    </li>}
                {pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                        <a onClick={() => (paginate(num))} href="#" className="page-link">{num}</a>
                    </li>
                ))}
                {pageNumbers.length !== pagination.currentPage &&
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => nextPage()}>Next</a>
                    </li>}
            </ul>
        </nav>
    )
}

export default Pagination