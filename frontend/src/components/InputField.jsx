import React from 'react';

function InputField(props) {
    return <input type={props.type} min={props.min} step={props.step} name={props.name} placeholder={props.placeholder} />
}

export default InputField