import React from 'react';

function FieldLabel(props) {
    return (
        <label for={props.for}>{props.labelText}
        </label>
    )
}

export default FieldLabel

