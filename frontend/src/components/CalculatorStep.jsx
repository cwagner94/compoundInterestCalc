import React from 'react';
import '../App.css'

function CalculatorStep(props) {
    return (
        <div className="stepsText">
            <h3>{props.step}</h3>
        </div>
    )
}

export default CalculatorStep