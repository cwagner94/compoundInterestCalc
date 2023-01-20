import React from 'react';
import '../App.css'

function LabelExplanation(props) {
    return (
        <div className="inputDescription">
            {props.explanation}
        </div>
    )
}

export default LabelExplanation