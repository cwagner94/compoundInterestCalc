const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function setCompoundFrequency(compoundFrequency) {
    if (compoundFrequency === 'Annually') {
        return 1
    } else if (compoundFrequency === 'Semiannually') {
        return 2
    } else if (compoundFrequency === 'Quarterly') {
        return 4
    } else if (compoundFrequency === 'Monthly') {
        return 12
    } else if (compoundFrequency === 'Daily') {
        return 365
    }
}

function compoundInitialInvestment(inputValues, interestRate) {
    if (interestRate === 0) {
        return inputValues.initialInvestment
    } else {
        var compoundedResult = inputValues.initialInvestment * (1 + interestRate / inputValues.compoundFrequency) ** (inputValues.compoundFrequency * inputValues.lengthInYears)
        return compoundedResult
    }
}

function compoundMonthlyContribution(inputValues, interestRate) {
    var pmt = inputValues.monthlyContribution * 12
    if (interestRate === 0) {
        return pmt * inputValues.lengthInYears
    } else {
        var compoundedResult = pmt * ((1 + (interestRate / inputValues.compoundFrequency)) ** (inputValues.lengthInYears * inputValues.compoundFrequency) - 1) / interestRate
        return compoundedResult
    }
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html')
    res.sendFile("/Users/chriswagner/Desktop/JS WD/ciCalculator/frontend/src/index.js")
});

app.post('/submit', function (req, res) {
    var inputValues = {
        initialInvestment: req.body.initialInvestment ? Number(req.body.initialInvestment) : 0,
        monthlyContribution: req.body.monthlyContribution ? Number(req.body.monthlyContribution) : 0,
        lengthInYears: req.body.lengthInYears ? Number(req.body.lengthInYears) : 0,
        interestRate: req.body.interestRate ? Number(req.body.interestRate) * 0.01 : 0,
        varianceRange: req.body.varianceRange ? (Number(req.body.varianceRange) * 0.01) : 0,
        compoundFrequency: setCompoundFrequency(req.body.compoundFrequency)
    }

    var compoundedInitialInvestment = compoundInitialInvestment(inputValues, inputValues.interestRate);
    var compoundedMonthlyContribution = compoundMonthlyContribution(inputValues, inputValues.interestRate);
    var noVarianceTotal = (compoundedInitialInvestment + compoundedMonthlyContribution).toFixed(2)

    if (inputValues.varianceRange) {
        inputValues.varianceRange && ([inputValues.upperVarianceRate, inputValues.lowerVarianceRate] = [inputValues.interestRate + inputValues.varianceRange, inputValues.interestRate - inputValues.varianceRange])

        var initialCompoundedUpperVariance = compoundInitialInvestment(inputValues, inputValues.upperVarianceRate);
        var initialCompoundedLowerVariance = compoundInitialInvestment(inputValues, inputValues.lowerVarianceRate);

        var monthlyCompoundedUpperVariance = compoundMonthlyContribution(inputValues, inputValues.upperVarianceRate);
        var montlyCompoundedLowerVariance = compoundMonthlyContribution(inputValues, inputValues.lowerVarianceRate);

        var upperVarianceTotal = (initialCompoundedUpperVariance + monthlyCompoundedUpperVariance).toFixed(2);
        var lowerVarianceTotal = (initialCompoundedLowerVariance + montlyCompoundedLowerVariance).toFixed(2);

    }

    var results = {
        noVarianceTotal: noVarianceTotal,
        upperVarianceTotal: upperVarianceTotal ? upperVarianceTotal : noVarianceTotal,
        lowerVarianceTotal: lowerVarianceTotal ? lowerVarianceTotal : noVarianceTotal
    }

    res.send(results)
})

app.get('/reset', function (req, res) {
    res.redirect('http://127.0.0.1:3000')
})

app.listen(5000, function () {
    console.log('server started on port 5000...')
});

// Next:
// Calculate all years in between 0 and lengthInYears

// TODO:
// lengthInYears needs to be < 100
// Calculate and reset buttons need to be fixed to the right side
// Finish CSS styling (Bootstrap or other framework?)
// Style graph

// Improvements/Refactoring:
// Break up App.jsx into more components
// Apply CSS to components, not App.jsx
// Break out routes into handler file

// Project inspiration: https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator