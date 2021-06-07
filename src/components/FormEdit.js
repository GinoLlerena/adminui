import React, { useState } from 'react'

const FormEdit = (props) => {

    const { item : { id, name, email, role }, onSubmit } = props

    const [currentName, setCurrentName] = useState(name)
    const [currentEmail, setCurrentEmail] = useState(email)
    const [currentRole, setCurrentRole] = useState(role)

    const returnObj = {
        name: currentName,
        email: currentEmail,
        role: currentRole
    }

    return(
        <form>
            <div className="mb-3 row">
                <label htmlFor="staticName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="staticName" value={currentName}
                           placeholder="Name" onChange={e => setCurrentName(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="staticEmail" value={currentEmail}
                           placeholder="email@example.com" onChange={e => setCurrentEmail(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticRole" className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="staticRole" value={currentRole}
                           placeholder="Role" onChange={e => setCurrentRole(e.target.value)}/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-10">

                </div>
                <div className="col-md-1">
                    <button type="submit" className="btn btn-secondary mb-3" onClick={props.onCancel}>Cancel</button>

                </div>
                <div className="col-md-1">
                    <button type="submit" className="btn btn-primary ml-3  mb-3" onClick={(e) => onSubmit(returnObj)}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default FormEdit