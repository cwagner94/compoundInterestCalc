import React, { useState } from 'react';
import '../App.css'
import CalculatorStep from './CalculatorStep'
import FieldLabel from './FieldLabel';
import InputField from './InputField';
import LabelExplanation from './LabelExplanation';
import SelectField from './SelectField';
import CalcResults from './CalcResults';

function App() {

    // const [calcResult, setCalcResult] = useState('0');
    // const [years, setYears] = useState('0')

    const [inputValues, setInputValues] = useState({
        initialInvestment: '',
        monthlyContribution: '',
        lengthInYears: '',
        interestRate: '',
        varianceRange: '',
        compoundFrequency: 'Annually'
    })

    const [total, setTotal] = useState('')

    // fetch('http://localhost:5000/submit')
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //         setCalcResult(data.noVarianceTotal)
    //         setYears(data.years)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

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
        event.preventDefault();
        fetch('http://127.0.0.1:5000/submit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputValues),
        }).then(async (res) => {
            var results = await res.json()
            setTotal(results.noVarianceTotal)
        }).catch((err) => {
            console.log(err)
        })
    }

    // formAction="http://127.0.0.1:5000/submit"
    // <form method='post' action='http://127.0.0.1:5000/submit' id="userInputs" onSubmit={handleSubmit}>
    // <input formAction="http://127.0.0.1:5000/submit" className="submitButton" type="submit" name="calculateButton" value="CALCULATE" />


    return (
        <div>
            <h1 className="calcTitle">Compound Interest Calculator</h1>
            <form id="userInputs" onSubmit={handleSubmit}>
                <div className="stepsText">
                    <CalculatorStep step={"Step 1: Initial Investment"} />
                </div>
                <div className="inputName">
                    <FieldLabel htmlFor={"initialInvestment"} labelText={"Initial Investment: "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"initialInvestment"} onChange={handleChange} value={inputValues.initialInvestment} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Amount of money that you have available to invest initially."} />
                </div>
                <div className="stepsText">
                    <CalculatorStep step={"Step 2: Contribute"} />
                </div>
                <div className="inputName">
                    <FieldLabel htmlFor={"monthlyContribution"} labelText={"Monthly Contribution (Negative if withdrawing): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} step={"0.01"} name={"monthlyContribution"} onChange={handleChange} value={inputValues.monthlyContribution} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Amount that you plan to add to the principal every month, or a negative number for the amount that you plan to withdraw every month."} />
                </div>
                <hr />
                <div className="inputName">
                    <FieldLabel htmlFor={"length"} labelText={"Length of Time in Years: "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"lengthInYears"} onChange={handleChange} value={inputValues.lengthInYears} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Length of time, in years, that you plan to save."} />
                </div>
                <div className="stepsText">
                    <CalculatorStep step={"Step 3: Interest Rate"} />
                </div>
                <div className="inputName">
                    <FieldLabel htmlFor={"interestRate"} labelText={"Estimated Interest Rate (In Percent): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} step={"0.01"} name={"interestRate"} onChange={handleChange} value={inputValues.interestRate} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Your estimated annual interest rate."} />
                </div>
                <hr />
                <div className="inputName">
                    <FieldLabel htmlFor={"varianceRange"} labelText={"Interest Rate Variance Range (In Percent): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"varianceRange"} onChange={handleChange} value={inputValues.varianceRange} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Range of interest rates (above and below the rate set above) that you desire to see results for."} />
                </div>
                <div className="stepsText">
                    <CalculatorStep step={"Step 4: Compound It"} />
                </div>
                <div className="inputName">
                    <FieldLabel htmlFor={"compoundFrequency"} labelText={"Compound Frequency: "} />
                </div>
                <div className="inputBox">
                    <SelectField name={"compoundFrequency"} id={"compoundFrequency"} onChange={handleChange} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Times per year that interest will be compounded."} />
                </div>
                <hr />
                <input className="submitButton" type="submit" name="calculateButton" value="CALCULATE" />
                <input formAction="http://127.0.0.1:5000/reset" className="resetButton" type="submit" name="resetButton" value="RESET" />
            </form>
            <div className="calcResults">
                <CalcResults years={inputValues.lengthInYears} noVarianceResult={total} />
            </div>
            <hr />
        </div>
    )
}

export default App;
