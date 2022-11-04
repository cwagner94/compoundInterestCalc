import React from 'react';
import '../App.css'
import CalculatorStep from './CalculatorStep'
import FieldLabel from './FieldLabel';
import InputField from './InputField';
import LabelExplanation from './LabelExplanation';
import SelectField from './SelectField';

function App() {
    return (
        <div>
            <h1 className="calcTitle">Compound Interest Calculator</h1>
            <form action='http://127.0.0.1:5000' method='post'>
                <div className="stepsText">
                    <CalculatorStep step={"Step 1: Initial Investment"} />
                </div>
                <div class="inputName">
                    <FieldLabel for={"initialInvestment"} labelText={"Initial Investment: "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"initialInvestment"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Amount of money that you have available to invest initially."} />
                </div>
                <div className="stepsText">
                    <CalculatorStep step={"Step 2: Contribute"} />
                </div>
                <div class="inputName">
                    <FieldLabel for={"monthlyContribution"} labelText={"Monthly Contribution (Negative if withdrawing): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} step={"0.01"} name={"monthlyContribution"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Amount that you plan to add to the principal every month, or a negative number for the amount that you plan to withdraw every month."} />
                </div>
                <hr />
                <div class="inputName">
                    <FieldLabel for={"length"} labelText={"Length of Time in Years: "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"length"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Length of time, in years, that you plan to save."} />
                </div>
                <div className="stepsText">
                    <CalculatorStep step={"Step 3: Interest Rate"} />
                </div>
                <div class="inputName">
                    <FieldLabel for={"interestRate"} labelText={"Estimated Interest Rate (In Percent): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} step={"0.01"} name={"interestRate"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Your estimated annual interest rate."} />
                </div>
                <hr />
                <div class="inputName">
                    <FieldLabel for={"varianceRange"} labelText={"Interest Rate Variance Range (In Percent): "} />
                </div>
                <div className="inputBox">
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"varianceRange"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Range of interest rates (above and below the rate set above) that you desire to see results for."} />
                </div>
                <div class="stepsText">
                    <CalculatorStep step={"Step 4: Compound It"} />
                </div>
                <div class="inputName">
                    <FieldLabel for={"compoundFrequency"} labelText={"Compound Frequency: "} />
                </div>
                <div className="inputBox">
                    <SelectField name={"compoundFrequency"} id={"compoundFrequency"} />
                </div>
                <div className="inputDescription">
                    <LabelExplanation explanation={"Times per year that interest will be compounded."} />
                </div>
                <hr />
                <input class="submitButton" type="submit" value="CALCULATE" />
                <button class="resetButton" type="button">RESET</button>
            </form>
            <div>
            </div>
        </div>
    )
}

export default App;
