import React from 'react';
import '../App.css'

function InputField(props) {
    return (
        <div className="inputBox">
            <input type={props.type} min={props.min} step={props.step} name={props.name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
        </div>
    )
}

export default InputField