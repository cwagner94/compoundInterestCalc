import React from 'react';

function CalcResults(props) {
    return (
        <div>
            <h2>The Results Are In</h2>
            <h3>In {props.years} years, you will have ${props.noVarianceResult}</h3>
        </div>
    )
}

export default CalcResults