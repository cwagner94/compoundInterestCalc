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
        return 3
    } else if (compoundFrequency === 'Monthly') {
        return 12
    } else if (compoundFrequency === 'Daily') {
        return 30
    }
}

function compoundInitialInvestment(principal, interestRate, length, compoundFrequency) {
    var compoundedResult = principal * (1 + interestRate / compoundFrequency) ** length
    var roundedFinalResult = Math.round((compoundedResult + Number.EPSILON) * 100 ) / 100;
    return roundedFinalResult
}

function compoundMonthlyContribution(monthlyContribution, interestRate, length) {
    var pmt = monthlyContribution * 12
    var compoundedResult = pmt * ((1 + interestRate) ** length - 1) / interestRate
    var roundedResult = Math.round((compoundedResult + Number.EPSILON) * 100 ) / 100;
    return roundedResult
}

function calculateUpperVariance(interestRate, varianceRange) {
    return interestRate + varianceRange;
}

function calculateLowerVariance(interestRate, varianceRange) {
    return interestRate - varianceRange;
}

function calculateTotal(compoundedInitialInvestment, compoundedMonthlyContribution, monthlyContribution) {
    if (monthlyContribution) {
        return compoundedInitialInvestment + compoundedMonthlyContribution
    } else {
        return compoundedInitialInvestment
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res) {
    var initialInvestment = Number(req.body.initialInvestment);
    var monthlyContribution = Number(req.body.monthlyContribution);
    var lengthInYears = Number(req.body.length);
    var interestRate = Number(req.body.interestRate) * 0.01;
    var varianceRange = Number(req.body.varianceRange) * 0.01;
    var compoundFrequency = req.body.compoundFrequency;
    var compoundFrequency = setCompoundFrequency(compoundFrequency)

    var compoundedInitialInvestment = compoundInitialInvestment(initialInvestment, interestRate, lengthInYears, compoundFrequency);
    var compoundedMonthlyContribution = compoundMonthlyContribution(monthlyContribution, interestRate, lengthInYears);

    if (varianceRange) {
        var upperVarianceRate = calculateUpperVariance(interestRate, varianceRange);
        var lowerVarianceRate = calculateLowerVariance(interestRate, varianceRange);

        var initialCompoundedUpperVariance = compoundInitialInvestment(initialInvestment, upperVarianceRate, lengthInYears, compoundFrequency);
        var initialCompoundedLowerVariance = compoundInitialInvestment(initialInvestment, lowerVarianceRate, lengthInYears, compoundFrequency);

        var monthlyCompoundedUpperVariance = compoundMonthlyContribution(monthlyContribution, upperVarianceRate, lengthInYears);
        var montlyCompoundedLowerVariance = compoundMonthlyContribution(monthlyContribution, lowerVarianceRate, lengthInYears);

        var upperVarianceTotal = calculateTotal(initialCompoundedUpperVariance, monthlyCompoundedUpperVariance, monthlyContribution);
        var lowerVarianceTotal = calculateTotal(initialCompoundedLowerVariance, montlyCompoundedLowerVariance, monthlyContribution);
    }

    var total = calculateTotal(compoundedInitialInvestment, compoundedMonthlyContribution, monthlyContribution);

    console.log(`Standard Total: ${total}`)
    console.log(`Upper Total: ${upperVarianceTotal}`)
    console.log(`Lower Total: ${lowerVarianceTotal}`)


    // res.send(compoundedResult)
});

app.listen(3000, function() {
    console.log('server started on port 3000...')
});


// What happens if monthly contrib is negative?
    // What about any other values?
    // What happens if lower variance range turns interest rate negative?
// Some decimals are off
    // In order: 10, 7, 5, 14, 11
// Does script work when compound frequency changes?