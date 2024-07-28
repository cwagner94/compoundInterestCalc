import React from 'react';
import '../CSS/LabelExplanation.css'

function LabelExplanation(props) {
    return (
        <div className="inputDescription">
            {props.explanation}
        </div>
    )
}

export default LabelExplanation