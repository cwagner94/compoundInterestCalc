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

function compoundMonthlyContribution(principal, interestRate, length) {
    var pmt = principal * 12
    var compoundedResult = pmt * ((1 + interestRate) ** length - 1) / interestRate
    var roundedResult = Math.round((compoundedResult + Number.EPSILON) * 100 ) / 100;
    return roundedResult
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res) {
    var initialInvestment = Number(req.body.initialInvestment);
    var monthlyContribution = Number(req.body.monthlyContribution);
    var lengthInYears = Number(req.body.length);
    var interestRate = Number(req.body.interestRate)*0.01;
    var varianceRange = Number(req.body.varianceRange);
    var compoundFrequency = req.body.compoundFrequency;
    var compoundFrequency = setCompoundFrequency(compoundFrequency)

    var compoundedInitialInvestment = compoundInitialInvestment(initialInvestment, interestRate, lengthInYears, compoundFrequency);
    console.log(compoundedInitialInvestment);

    var compoundedMonthlyContribution = compoundMonthlyContribution(initialInvestment, interestRate, lengthInYears);

    if (monthlyContribution > 0) {
        var finalResult = compoundedInitialInvestment + compoundedMonthlyContribution
    } else {
        var finalResult = compoundedInitialInvestment
    }

    // res.send(compoundedResult)
});

app.listen(3000, function() {
    console.log('server started on port 3000...')
});

// all the req.body values needs to have a default value of 0 (except compound frequency)
    // Or we need to account for them being a ''
// Finish all the formulas 