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

function compoundInitialInvestment(inputValues, interestRate, year) {
    if (interestRate === 0) {
        return inputValues.initialInvestment
    } else {
        var compoundedResult = inputValues.initialInvestment * (1 + interestRate / inputValues.compoundFrequency) ** (inputValues.compoundFrequency * year)
        return compoundedResult
    }
}

function compoundMonthlyContribution(inputValues, interestRate, year) {
    var pmt = inputValues.monthlyContribution * 12
    if (interestRate === 0) {
        return pmt * year
    } else {
        var compoundedResult = pmt * ((1 + (interestRate / inputValues.compoundFrequency)) ** (year * inputValues.compoundFrequency) - 1) / interestRate
        return compoundedResult
    }
}

function compound(inputValues, interestRate) {
    var years = inputValues.lengthInYears;
    var yearlyTotals = []
    for (let year = 0; year <= years; year++) {
        var compoundedInitialInvestment = compoundInitialInvestment(inputValues, interestRate, year);
        var compoundedMonthlyContribution = compoundMonthlyContribution(inputValues, interestRate, year);
        var total = (compoundedInitialInvestment + compoundedMonthlyContribution).toFixed(2);
        yearlyTotals.push(total);
    }
    return yearlyTotals
}

function calculateContributions(inputValues) {
    var years = inputValues.lengthInYears;
    var contribution = inputValues.initialInvestment;
    var yearlyContributions = [contribution.toFixed(2)]
    for (let year = 0; year < years; year++) {
        contribution += (inputValues.monthlyContribution * 12)
        yearlyContributions.push(contribution.toFixed(2))
    }
    return yearlyContributions
}

app.get('/', (req, res) => {
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

    var noVarianceTotal = compound(inputValues, inputValues.interestRate)
    var yearlyContributions = calculateContributions(inputValues)

    if (inputValues.varianceRange) {
        inputValues.varianceRange && ([inputValues.upperVarianceRate, inputValues.lowerVarianceRate] = [inputValues.interestRate + inputValues.varianceRange, inputValues.interestRate - inputValues.varianceRange])

        var upperVarianceTotal = compound(inputValues, inputValues.upperVarianceRate)
        var lowerVarianceTotal = compound(inputValues, inputValues.lowerVarianceRate)
    }

    var results = {
        noVarianceTotal: noVarianceTotal,
        upperVarianceTotal: upperVarianceTotal && upperVarianceTotal,
        lowerVarianceTotal: lowerVarianceTotal && lowerVarianceTotal,
        yearlyContributions: yearlyContributions
    }

    res.send(results)
})

app.get('/reset', function (req, res) {
    res.redirect('http://127.0.0.1:3000')
})

app.listen(5000, function () {
    console.log('server started on port 5000...')
});


// Add a readme to github w/ screenshot of output
// Remove all unused files

// Improvements:
// Break up App.css into separate files for each component
// After user inputs in a field, add $ or % and commas if necessary
// Folder structure
    // backend --> routes --> handler file
// CSS
    // Calculate and reset buttons need to be fixed to the right side


// Project inspiration: https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
