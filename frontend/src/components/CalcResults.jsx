import React from 'react';
import Graph from './Graph'

function CalcResults(props) {
    return (
        <div>
            <h2>The Results Are In</h2>
            <h3>In {props.years} years, you will have ${props.noVarianceResult}</h3>
            <h3>
                The chart below shows an estimate of how much your initial savings will grow over time , according to the interest rate and compounding schedule you specified.
            </h3>
            <h3>
                Please remember that slight adjustments in any of those variables can affect the outcome. Reset the calculator and provide different figures to show different scenarios.
            </h3>
            <Graph data={props.data} />
        </div>
    )
}

export default CalcResults