import React from 'react';
import '../CSS/FieldLabel.css'

function FieldLabel(props) {
    return (
        <div className="inputName">
            <label htmlFor={props.htmlFor}>
                {props.labelText}
            </label>
        </div>
    )
}

export default FieldLabel