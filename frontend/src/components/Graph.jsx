import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../Graph.css'

function Graph(props) {

    const options = {
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        hover: {
            mode: 'index',
            intersect: false
        },
    }

    return (
        <div className='graph-container'>
            <h2>Total Savings</h2>
            <Line data={props.graphData} options={options} />
        </div>
    )
}

export default Graph;


// label: (tooltipItem, data) => {
//     var label = data.datasets[tooltipItem.datasetIndex].label || '';
//     return label + ' ' + (Math.round(tooltipItem.yLabel * 100) / 100).toFixed(2);
// }