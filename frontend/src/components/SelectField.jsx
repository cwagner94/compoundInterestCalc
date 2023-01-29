import React from 'react'
import SelectFieldOption from './SelectFieldOption'
import '../CSS/SelectField.css'

function SelectField(props) {
    return (
        <div className="inputBox">
            <select name={props.name} id={props.id} onChange={props.onChange}>
                <SelectFieldOption value={"Annually"} text={"Annually"} />
                <SelectFieldOption value={"Semiannually"} text={"Semiannually"} />
                <SelectFieldOption value={"Quarterly"} text={"Quarterly"} />
                <SelectFieldOption value={"Monthly"} text={"Monthly"} />
                <SelectFieldOption value={"Daily"} text={"Daily"} />
            </select>
        </div>
    )
}

export default SelectField