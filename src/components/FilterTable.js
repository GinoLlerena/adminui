import React from 'react'

const FilterTable = (props) => {

    return(
        <div className="mb-3 row">
            <input className="form-control form-control-lg" type="text" placeholder="Search by name, email or role"
                       value={props.filterText} onChange={e => props.onChange(e.target.value)}  />
        </div>
    )
}

export default FilterTable