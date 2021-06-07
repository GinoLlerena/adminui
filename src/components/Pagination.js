import React from 'react'
import map from 'lodash/fp/map'

const Pagination = (props) => {
    const { pages, currentPage, onNext, onPrevious, onPage } = props

    const l =  Array.from(new Array(pages), (x,i) => i)

    const list = map((i) => <li key ={i} className={`page-item ${currentPage === i ? 'active' : ''}`} onClick={() => onPage(i)}><a className={`page-link `} >{i + 1}</a></li>)(l)


    return(
        <nav ariaLabel="Page navigation example">
            <ul className="pagination">
                <li className="page-item" onClick={onPrevious}><a className="page-link">Previous</a></li>
                {list}
                <li className="page-item" onClick={onNext}><a className="page-link"  >Next</a></li>
            </ul>
        </nav>
    )
}

export default Pagination