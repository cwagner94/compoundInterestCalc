import React from 'react'
import SelectFieldOption from './SelectFieldOption'

function SelectField(props) {
    return (
        <select name={props.name} id={props.id}>
            <SelectFieldOption value={"Annually"} text={"Annually"} />
            <SelectFieldOption value={"Semiannually"} text={"Semiannually"} />
            <SelectFieldOption value={"Quarterly"} text={"Quarterly"} />
            <SelectFieldOption value={"Monthly"} text={"Monthly"} />
            <SelectFieldOption value={"Daily"} text={"Daily"} />
        </select>
    )
}

export default SelectField