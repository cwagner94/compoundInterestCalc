import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../Graph.css'

function Graph(props) {

    const calcData = props.data

    // var labelsData = []
    // for (let i = 0; i < calcData.noVarianceTotal.length; i++) {
    //     labelsData.push(`Year ${i}`)
    // }

    // const [calcData, setCalcData] = useState(props.data)
    // const [labelsData, setLabelsData] = useState([])

    // for (let i = 0; i < calcData.noVarianceTotal.length; i++) {
    //     setLabelsData(previous => {
    //         return [...previous, `Year ${i}`]
    //     })
    // }

    const graphData = {
        // labels: labelsData,
        labels: ['1', '2', '3'],
        datasets: [
            {
                label: "No Variance Total",
                data: calcData.noVarianceTotal,
                borderColor: "red"
            },
            {
                label: "Upper Variance Total",
                data: calcData.upperVarianceTotal,
                borderColor: "blue",
            },
            {
                label: "Low Variance Total",
                data: calcData.lowerVarianceTotal,
                borderColor: "green"
            }
        ]
    };

    // const options = {
    //     scales: {
    //         yAxis: {
    //             ticks: {
    //                 color: 'white',
    //                 font: {
    //                     size: "50",
    //                     color: "white"
    //                 }
    //             },
    //             grid: {
    //                 color: "white"
    //             }
    //         },
    //         xAxis: {
    //             ticks: {
    //                 color: 'white',
    //                 font: {
    //                     size: "18",
    //                     color: "white"
    //                 }
    //             },
    //             grid: {
    //                 color: "white",
    //             }
    //         }
    //     }
    // }

    return (
        <div className='graph-container'>
            <h2>Total Savings</h2>
            <Line data={graphData} />
        </div>
    )
}

export default Graph;

// https://www.chartjs.org/docs/latest/samples/line/interpolation.html
// use tension to change curvature of the line (do for each line individually)
// datasets: [
//     {
//         tension: 0.1
//     }
// ]
