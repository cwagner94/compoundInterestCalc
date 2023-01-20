import React, { useState } from 'react';
import '../App.css'
import CalculatorStep from './CalculatorStep'
import FieldLabel from './FieldLabel';
import InputField from './InputField';
import LabelExplanation from './LabelExplanation';
import SelectField from './SelectField';
import CalcResults from './CalcResults';


function App() {
    var nf = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    });

    const [inputValues, setInputValues] = useState({
        initialInvestment: "",
        monthlyContribution: "",
        lengthInYears: "",
        interestRate: "",
        varianceRange: "",
        compoundFrequency: 'Annually'
    })

    const [displayValues, setDisplayValues] = useState({
        years: '',
        interestRate: '',
        upperVariance: '',
        lowerVariance: ''
    })

    const [isFilledOut, setIsFilledOut] = useState(false)

    const [calcResults, setCalcResults] = useState({
        noVarianceTotal: [],
        upperVarianceTotal: [],
        lowerVarianceTotal: [],
        yearlyContributions: []
    })

    function handleChange(event) {
        const field = event.target.name
        const input = event.target.value
        setInputValues(previous => {
            return {
                ...previous,
                [field]: input
            }
        })
    }

    function handleSubmit(event) {
        if (event.nativeEvent.submitter.name === 'calculateButton') {
            setIsFilledOut(true)
            event.preventDefault();
            fetch('http://127.0.0.1:5000/submit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValues)
            }).then(async (res) => {
                var results = await res.json()
                setCalcResults(results)
                setDisplayValues({
                    years: inputValues.lengthInYears,
                    interestRate: nf.format(inputValues.interestRate),
                    upperVariance: nf.format(parseFloat(inputValues.interestRate) + parseFloat(inputValues.varianceRange)),
                    lowerVariance: nf.format(inputValues.interestRate - inputValues.varianceRange)
                })
            }).catch((err) => {
                console.log(err)
            })
        } else if (event.nativeEvent.submitter.name === 'resetButton') {
            setIsFilledOut(false)
            fetch('http://127.0.0.1:5000/reset')
        }
    }

    var labelsData = [];
    calcResults.noVarianceTotal.forEach((currentValue, index) => {
        labelsData.push(`Year ${index}`)
    })

    var data = [
        {
            label: `Future Value (${displayValues.interestRate}%)`,
            data: calcResults.noVarianceTotal,
            borderColor: "red",
            backgroundColor: "red",
        }
    ];

    if (inputValues.varianceRange) {
        data.push({
            label: `Variance Above (${displayValues.upperVariance}%)`,
            data: calcResults.upperVarianceTotal,
            borderColor: "blue",
            backgroundColor: "blue",
        })
        data.push(
            {
                label: `Variance Below (${displayValues.lowerVariance}%)`,
                data: calcResults.lowerVarianceTotal,
                borderColor: "green",
                backgroundColor: "green"
            })
    } else {
        data.push(
            {
                label: `Total Contributions`,
                data: calcResults.yearlyContributions,
                borderColor: "green",
                backgroundColor: "green"
            })
    };

    const graphData = {
        labels: labelsData,
        datasets: data,
    };

    return (
        <div>
            <h1 className="calcTitle">Compound Interest Calculator</h1>
            <form id="userInputs" onSubmit={handleSubmit}>
                <CalculatorStep step={"Step 1: Initial Investment"} />
                <FieldLabel htmlFor={"initialInvestment"} labelText={"Initial Investment: "} />
                <InputField type={"number"} min={"0"} step={"0.01"} name={"initialInvestment"} onChange={handleChange} value={inputValues.initialInvestment} />
                <LabelExplanation explanation={"Amount of money that you have available to invest initially."} />
                <CalculatorStep step={"Step 2: Contribute"} />
                <FieldLabel htmlFor={"monthlyContribution"} labelText={"Monthly Contribution (Negative if withdrawing): "} />
                <InputField type={"number"} step={"0.01"} name={"monthlyContribution"} onChange={handleChange} value={inputValues.monthlyContribution} />
                <LabelExplanation explanation={"Amount that you plan to add to the principal every month, or a negative number for the amount that you plan to withdraw every month."} />
                <hr />
                <FieldLabel htmlFor={"length"} labelText={"Length of Time in Years: "} />
                <InputField type={"number"} min={"0"} step={"0.01"} name={"lengthInYears"} onChange={handleChange} value={inputValues.lengthInYears} />
                <LabelExplanation explanation={"Length of time, in years, that you plan to save."} />
                <CalculatorStep step={"Step 3: Interest Rate"} />
                <FieldLabel htmlFor={"interestRate"} labelText={"Estimated Interest Rate (In Percent): "} />
                <InputField type={"number"} step={"0.01"} name={"interestRate"} onChange={handleChange} value={inputValues.interestRate} />
                <LabelExplanation explanation={"Your estimated annual interest rate."} />
                <hr />
                <FieldLabel htmlFor={"varianceRange"} labelText={"Interest Rate Variance Range (In Percent): "} />
                <InputField type={"number"} min={"0"} step={"0.01"} name={"varianceRange"} onChange={handleChange} value={inputValues.varianceRange} />
                <LabelExplanation explanation={"Range of interest rates (above and below the rate set above) that you desire to see results for."} />
                <CalculatorStep step={"Step 4: Compound It"} />
                <FieldLabel htmlFor={"compoundFrequency"} labelText={"Compound Frequency: "} />
                <SelectField name={"compoundFrequency"} id={"compoundFrequency"} onChange={handleChange} />
                <LabelExplanation explanation={"Times per year that interest will be compounded."} />
                <hr />
                <input className="submitButton" type="submit" name="calculateButton" value="CALCULATE" />
                <input className="resetButton" type="submit" name="resetButton" value="RESET" />
            </form>
            {isFilledOut && <div className="calcResults">
                <CalcResults years={displayValues.years} calcResults={calcResults} graphData={graphData} />
            </div>}
            <hr />
        </div>
    )
}

export default App;