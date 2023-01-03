import React, { useState } from 'react';
import Graph from './Graph'


function CalcResults(props) {

    const total = props.calcResults.noVarianceTotal.at(-1)

    return (
        <div>
            <h2>The Results Are In</h2>
            <h3>In {props.years} years, you will have ${total}</h3>
            <h3>
                The chart below shows an estimate of how much your initial savings will grow over time , according to the interest rate and compounding schedule you specified.
            </h3>
            <h3>
                Please remember that slight adjustments in any of those variables can affect the outcome. Reset the calculator and provide different figures to show different scenarios.
            </h3>
            <Graph graphData={props.graphData} />
        </div>
    )
}

export default CalcResults