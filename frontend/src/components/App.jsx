import React from 'react';
import '../App.css'
import CalculatorStep from './CalculatorStep'
import FieldLabel from './FieldLabel';
import InputField from './InputField';
import LabelExplanation from './LabelExplanation';
import SelectField from './SelectField';

function App() {
    return (
        <div className='App'>
            <h1>Compound Interest Calculator</h1>
            <form action='http://127.0.0.1:5000' method='post'>
                <div>
                    <CalculatorStep step={"Step 1: Initial Investment"} />
                    <div className='inputArea'>
                        <FieldLabel for={"initialInvestment"} labelText={"Initial Investment: "} />
                        <InputField type={"number"} min={"0"} step={"0.01"} name={"initialInvestment"} placeholder={"Initial Investment"} />
                        <LabelExplanation explanation={"Amount of money that you have available to invest initially."} />
                    </div>
                </div>
                <div>
                    <CalculatorStep step={"Step 2: Contribute"} />
                    <div className='inputArea'>
                        <FieldLabel for={"monthlyContribution"} labelText={"Monthly Contribution (Negative if withdrawing): "} />
                        <InputField type={"number"} step={"0.01"} name={"monthlyContribution"} placeholder={"Monthly Contribution"} />
                        <LabelExplanation explanation={"Amount that you plan to add to the principal every month, or a negative number for the amount that you plan to withdraw every month."} />
                    </div>
                </div>
                <div className='inputArea'>
                    <FieldLabel for={"length"} labelText={"Length of Time in Years: "} />
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"length"} placeholder={"Length of Time in Years"} />
                    <LabelExplanation explanation={"Length of time, in years, that you plan to save."} />
                </div>
                <div>
                    <CalculatorStep step={"Step 3: Interest Rate"} />
                    <div className='inputArea'>
                        <FieldLabel for={"interestRate"} labelText={"Estimated Interest Rate (In Percent): "} />
                        <InputField type={"number"} step={"0.01"} name={"interestRate"} placeholder={"Estimated Interest Rate"} />
                        <LabelExplanation explanation={"Your estimated annual interest rate."} />
                    </div>
                </div>
                <div className='inputArea'>
                    <FieldLabel for={"varianceRange"} labelText={"Interest Rate Variance Range (In Percent): "} />
                    <InputField type={"number"} min={"0"} step={"0.01"} name={"varianceRange"} placeholder={"Interest Rate Variance Range"} />
                    <LabelExplanation explanation={"Range of interest rates (above and below the rate set above) that you desire to see results for."} />
                </div>
                <div>
                    <CalculatorStep step={"Step 4: Compound It"} />
                    <div className='inputArea'>
                        <FieldLabel for={"compoundFrequency"} labelText={"Compound Frequency: "} />
                        <SelectField name={"compoundFrequency"} id={"compoundFrequency"} />
                        <LabelExplanation explanation={"Times per year that interest will be compounded."} />
                    </div>
                </div>
                <div className='buttonArea'>
                    <input type="submit" value="Calculate" />
                </div>
            </form>
            <div className='buttonArea'>
                <button type="button">Reset</button>
            </div>
        </div>
    )
}

export default App;
