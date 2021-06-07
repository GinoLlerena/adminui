import React from 'react'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import {IconEdit, IconTrash} from "./icons";

const HeaderCell =({title}) => <th scope="col" >{title}</th>

const Header = (props) => {
    const { config, selectedAll, onSelectedAll } = props
    const headerList = flow(
        entries,
        map(([idx, cfg]) => <HeaderCell key={idx} title={cfg.title} />)
    )(config)

    return(
        <thead>
            <tr>
                <th>
                    <div className="form-check form-check-inline" >
                        <input className="form-check-input" type="checkbox" checked={selectedAll} id="flexCheckDefault" onChange={onSelectedAll} />
                    </div>
                </th>
                {headerList}
                <th>Actions</th>
            </tr>
        </thead>
    )
}

const BodyCell =({value}) => <td>{value}</td>

const Body = (props) => {
    const { config, data, onEdit, onDelete, onSelect, selectedIds } = props
    const bodyList =  (item) => flow(
        entries,
        map(([idx, cfg]) => <BodyCell key={idx} value={item[cfg.columnName]} />)
    )(config)

    const rowList = map((item)=> {
        return (<tr key={item.id}>
            <td>
                <div className="form-check form-check-inline" >
                    <input className="form-check-input" type="checkbox" checked={selectedIds?.[item.id]} id="flexCheckDefault" onChange={()=> onSelect(item.id)} />
                </div>
            </td>
            {bodyList(item)}
            <td>
                <div className={'d-inline '} onClick={() => onEdit(item.id)}>
                   <IconEdit />
                </div>
                <div className={'d-inline ms-2'} onClick={() => onDelete(item.id)}>
                    <IconTrash />
                </div>
            </td>

        </tr>)
    })(data)

    return(
        <tbody>
            {rowList}
        </tbody>
    )
}

const SimpleTable = (props) => {
    const { config, data, onEdit, onDelete, onSelect, selectedIds, selectedAll, onSelectedAll } = props
    return(
        <table className="table">
            <Header config={config} selectedAll={selectedAll} onSelectedAll={onSelectedAll} />
            <Body config={config} data={data} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} selectedIds={selectedIds} />
        </table>
    )
}

export default SimpleTable