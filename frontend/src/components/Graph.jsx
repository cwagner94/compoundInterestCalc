import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../Graph.css'

function Graph(props) {

    const data = props.data

    const graphData = {
        labels: ["Year 0", "Year 1", "Year 2", 'a', 'h'],
        datasets: [
            {
                tension: 0.1,
                label: "No Variance Total",
                data: [33, 10, 12, 18, 29, 5],
                borderColor: "black"
            },
            {
                label: "Upper Variance Total",
                data: [33, 25, 35, 51, 2, 50],
                borderColor: "black",
            },
            {
                label: "Low Variance Total",
                data: [33, 20, 2, 33, 59, 12],
                borderColor: "black"
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
