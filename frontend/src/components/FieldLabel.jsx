import React from 'react';
import '../App.css'

function FieldLabel(props) {
    return (
        <div className="inputName">
            <label htmlFor={props.htmlFor}>{props.labelText}
            </label>
        </div>
    )
}

export default FieldLabel