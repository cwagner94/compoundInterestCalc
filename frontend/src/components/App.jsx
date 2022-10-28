import React from 'react';

function App() {
    return (
        <div>
            <h1>Compound Interest Calculator</h1>
            <form action='http://127.0.0.1:5000' method='post'>
                <div>
                    <label for="initialInvestment">Initial Investment:
                        <input type="number" min="0" step="0.01" name="initialInvestment" placeholder="Initial Investment" />
                    </label>
                </div>
                <div>
                    <label for="monthlyContribution">Monthly Contribution (Negative if withdrawing):
                        <input type="number" step="0.01" name="monthlyContribution" placeholder="Monthly Contribution" />
                    </label>
                </div>
                <div>
                    <label for="length">Length of Time in Years:
                        <input type="number" min="0" step="0.01" name="length" placeholder="Length of Time in Years" />
                    </label>
                </div>
                <div>
                    <label for="interestRate">Estimated Interest Rate (In Percent):
                        <input type="number" step="0.01" name="interestRate" placeholder="Estimated Interest Rate" />
                    </label>
                </div>
                <div>
                    <label for="varianceRange">Interest Rate Variance Range (In Percent):
                        <input type="number" min="0" step="0.01" name="varianceRange" placeholder="Interest Rate Variance Range" />
                    </label>
                </div>
                <div>
                    <label for="compoundFrequency">Compound Frequency:
                        <select name="compoundFrequency" id="compoundFrequency">
                            <option value="Annually">Annually</option>
                            <option value="Semiannually">Semiannually</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Daily">Daily</option>
                        </select>
                    </label>git
                </div>
                <div>
                    <input type="submit" value="Calculate" />
                </div>
            </form>
            <button type="button" onclick="">Reset</button>
        </div>
    )
}

export default App;