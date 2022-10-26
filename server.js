const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

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
        // console.log(`compoundInitialInvestment: ${compoundedResult}`)
        return compoundedResult
    }
}

function compoundMonthlyContribution(inputValues, interestRate) {
    var pmt = inputValues.monthlyContribution * 12
    if (interestRate === 0) {
        return pmt * inputValues.lengthInYears
    } else {
        // var compoundedResult = pmt * ((1 + interestRate) **  inputValues.lengthInYears - 1) / interestRate
        var compoundedResult = pmt * ((1 + (interestRate / inputValues.compoundFrequency)) **  (inputValues.lengthInYears * inputValues.compoundFrequency) - 1) / interestRate
        // var compoundedResult = pmt * ((1 + interestRate/inputValues.compoundFrequency) **  (inputValues.lengthInYears * inputValues.compoundFrequency) - 1) / interestRate/inputValues.compoundFrequency
        // var compoundedResult = pmt * ( ((1 + interestRate/inputValues.compoundFrequency) ** (inputValues.lengthInYears * inputValues.compoundFrequency) - 1) / (interestRate/inputValues.compoundFrequency) )
        // console.log(`compoundMonthlyContribution: ${compoundedResult}`)
        return compoundedResult
    }
}

// 1
// 0.00013699

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res) {
    var inputValues = {
        initialInvestment: req.body.initialInvestment ? Number(req.body.initialInvestment) : 0,
        monthlyContribution: req.body.monthlyContribution ? Number(req.body.monthlyContribution) : 0,
        lengthInYears: req.body.length ? Number(req.body.length) : 0,
        interestRate: req.body.interestRate ? Number(req.body.interestRate) * 0.01 : 0,
        varianceRange: req.body.varianceRange ? (Number(req.body.varianceRange) * 0.01) : 0,
        compoundFrequency: setCompoundFrequency(req.body.compoundFrequency)
    }

    var compoundedInitialInvestment = compoundInitialInvestment(inputValues, inputValues.interestRate);
    var compoundedMonthlyContribution = compoundMonthlyContribution(inputValues, inputValues.interestRate);
    var noVarianceTotal = (compoundedInitialInvestment + compoundedMonthlyContribution).toFixed(2)

    console.log(`Standard Total: ${noVarianceTotal}`)

    if (inputValues.varianceRange) {
        inputValues.varianceRange && ([inputValues.upperVarianceRate, inputValues.lowerVarianceRate] = [inputValues.interestRate + inputValues.varianceRange, inputValues.interestRate - inputValues.varianceRange])
        // console.log(inputValues.lowerVarianceRate)

        var initialCompoundedUpperVariance = compoundInitialInvestment(inputValues, inputValues.upperVarianceRate);
        var initialCompoundedLowerVariance = compoundInitialInvestment(inputValues, inputValues.lowerVarianceRate);

        var monthlyCompoundedUpperVariance = compoundMonthlyContribution(inputValues, inputValues.upperVarianceRate);
        var montlyCompoundedLowerVariance = compoundMonthlyContribution(inputValues, inputValues.lowerVarianceRate);

        var upperVarianceTotal = (initialCompoundedUpperVariance + monthlyCompoundedUpperVariance).toFixed(2);
        var lowerVarianceTotal = (initialCompoundedLowerVariance + montlyCompoundedLowerVariance).toFixed(2);

        console.log(`Upper Total: ${upperVarianceTotal}`)
        console.log(`Lower Total: ${lowerVarianceTotal}`)
    }

    // res.send(`<p>${noVarianceTotal}</p>`)
});

app.listen(3000, function() {
    console.log('server started on port 3000...')
});

// Modify formulas to allow for all of the compound frequency options
    // compoundMOntlyContribution() formula isn't working as expected
    // Commented out version works, but not for other compound frequency options outside of annual
    // I think that the non-commented out one is working!!!
        // Need to check all use cases though

// https://www.math.utah.edu/~krtolica/4C.pdf
// https://courses.byui.edu/MATH_100G/NewTextbook/Chapter3/Section3.3/3.3B_MathExercise.pdf
// https://www.calculator.net/compound-interest-calculator.html
// https://www.wallstreetiswaiting.com/running-the-numbers-1/calculating-interest-recurring-payments/
// https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
// https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
// https://canvasjs.com/react-charts/line-chart/
// https://blog.logrocket.com/top-5-react-chart-libraries/