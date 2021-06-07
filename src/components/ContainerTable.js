import React, { useReducer, useEffect } from 'react'
import SimpleTable from "./SimpleTable";
import { adminCfg } from '../utils/constants'
import filter from 'lodash/fp/filter'
import omit from 'lodash/fp/omit'
import some from 'lodash/fp/some'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import cloneDeep from 'lodash/fp/cloneDeep'
import FilterTable from "./FilterTable";
import Pagination from "./Pagination";
import FormEdit from "./FormEdit";
const init = (prevState, nextState) => ({...prevState, ...nextState})
const initState = { data: [], selectedIds: {}, filterText: '', currentPage: 0, selectedAll: false, currentId: -1 }
const MAX_ROWS = 10

const calculateNumbers = (length) => {
    const nPages = Math.ceil(length / MAX_ROWS)
    return nPages
}

const ContainerTable = (props) => {

    const [state, setState] = useReducer(init, initState)
    useEffect(()=>{
        async function onLoad() {
            const requestOptions = {
                method: 'GET',
            }
            const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json', requestOptions).then(response => response.json())
            const pages = calculateNumbers(response.length)
            setState({data: response, pages})
        }
        onLoad()
    }, [])

    const onEdit = (id) => {
        setState({currentId: id})
    }

    const onDelete = (id) => {
        const data = filter( item => item.id !== id)(state.data)
        setState({ data, pages: calculateNumbers(data.length) })
    }

    const onSelect = (id) => {
        if(state.selectedIds[id]){
            const selectedIds = omit([id])(state.selectedIds)
            setState({ selectedIds })
        } else {
            const selectedIds = { ...state.selectedIds, [id]: true}
            setState({ selectedIds })
        }

    }

    const onSelectedAll = (currentData) => _ => {
        const selectedIdsCloned = cloneDeep(state.selectedIds)
        currentData.forEach(item => {
            if(selectedIdsCloned[item.id]){
                selectedIdsCloned[item.id] = !selectedIdsCloned[item.id]
            } else {
                selectedIdsCloned[item.id] = true
            }
        })
        setState({ selectedIds: selectedIdsCloned})
    }

    const onChange = value => setState({ filterText: value })

    const getFilterData = (filterText, data) => {
        const _data = filter(item => {
            const filters = filter(cfg => cfg.isForFilter)(adminCfg)
            return some((fil)=> item[fil.columnName].includes(filterText))(filters)
        })(data)

        return _data
    }

    const onNext = () => {
        if(state.currentPage < state.pages - 1){
            setState({ currentPage: state.currentPage + 1 })
        }
    }

    const onPrevious = () => {
        if(state.currentPage > 0 ){
            setState({ currentPage: state.currentPage - 1 })
        }
    }

    const onPage = (page) => {
        setState({ currentPage: page})
    }

    const getDataToShow = (data) => {
        const start = state.currentPage * MAX_ROWS
        const _data = data.slice(start, start + MAX_ROWS)
        return _data
    }

    const onDeleteSelected = () => {
        const data = filter(item => !state.selectedIds[item.id])(state.data)
        setState({ data, pages: calculateNumbers(data.length)})
    }

    const onCancel = _ => setState({ currentId : -1 })

    const onSubmit = (obj) => {

        const _data = map((item) => {
            if(parseInt(item.id) === parseInt(state.currentId)){
                return { ...item, ...obj}
            }
            return  item
        })(state.data)
        setState({ data: _data, currentId: -1})
    }


    const currentData = getDataToShow(getFilterData(state.filterText, state.data))

    const currentItem = find(item => parseInt(item.id) === parseInt(state.currentId))(state.data)

    return(
        <div className='container'>
            {state.currentId === -1 ? <>
                <FilterTable onChange={onChange} filterText={state.filterText} />
                <SimpleTable config={adminCfg} data={currentData} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} onSelectedAll={onSelectedAll(currentData)} selectedIds={state.selectedIds} />
                <div className={'row'}>
                    <div className={'col'}>
                        <button type="button" className="btn btn-danger" onClick={onDeleteSelected}>Delete Selected</button>
                    </div>
                    <div className={'col'}>
                        <Pagination pages={state.pages} currentPage={state.currentPage} onNext={onNext} onPrevious={onPrevious} onPage={onPage} />
                    </div>
                    <div className={'row'}>

                    </div>
                </div>
            </>   : null }
            {state.currentId !== -1 ? <FormEdit item={currentItem} onCancel={onCancel} onSubmit={onSubmit}  /> : null}
        </div>
    )
}

export default ContainerTable