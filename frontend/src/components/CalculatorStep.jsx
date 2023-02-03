import React from 'react';
import '../CSS/CalculatorStep.css'

function CalculatorStep(props) {
    return (
        <div>
            <h3 className="stepsText">
                {props.step}
            </h3>
        </div>
    )
}

export default CalculatorStep