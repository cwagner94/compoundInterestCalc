import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../Graph.css'

function Graph(props) {
    return (
        <div className='graph-container'>
            <h2>Total Savings</h2>
            <Line data={props.graphData} />
        </div>
    )
}

export default Graph;