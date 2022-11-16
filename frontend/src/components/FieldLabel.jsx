import React from 'react';

function FieldLabel(props) {
    return (
        <label htmlFor={props.htmlFor}>{props.labelText}
        </label>
    )
}

export default FieldLabel

