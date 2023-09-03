var express = require("express");
var router = express.Router();

// Function to calculate the preAssessment value
function calculatePreAssessment(loanAmount,BalanceSheetData) {
    // const last12Months = BalanceSheetData.sheet.slice(0, 12);
    const hasProfit = BalanceSheetData.some(entry => parseFloat(entry.profitOrLoss) > 0);
    const assetValues = BalanceSheetData.map(entry => parseFloat(entry.assetsValue));
    const averageAssetValue = assetValues.reduce((total, value) => total + value, 0) / 12;
  
    let preAssessment = 20; // Default value
  
    if (hasProfit) {
      preAssessment = 60; // Business made a profit
    }
  
    if (averageAssetValue > loanAmount) {
      preAssessment = 100; // Average asset value is greater than the loan amount
    }
  
    return preAssessment;
  }


//preassessment
router.post('/:provider/balancesheet', (req, res) => {
    const loanAmount = req.body.loanAmount;
    const { provider } = req.params;
    console.log({provider})
    // res.send('Loan amount received: ' + loanAmount);
    const BalanceSheetData=req.session.BalanceSheetData
    console.log({BalanceSheetData})
    const preAssessmentValue =calculatePreAssessment(loanAmount,BalanceSheetData)
    console.log({ preAssessment: preAssessmentValue });
    res.json({ preAssessment: preAssessmentValue });
  });
  
  module.exports=router