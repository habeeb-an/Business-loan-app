var express = require("express");
var router = express.Router();

function calculatePreAssessment(loanAmount,BalanceSheetData) {
  
    const hasProfit = BalanceSheetData.some(entry => parseFloat(entry.profitOrLoss) > 0);
    const assetValues = BalanceSheetData.map(entry => parseFloat(entry.assetsValue));
    const averageAssetValue = assetValues.reduce((total, value) => total + value, 0) / 12;
  
    let preAssessment = 20; 
  
    if (hasProfit) {
      preAssessment = 60; //if profitable
    }
  
    if (averageAssetValue > loanAmount) {
      preAssessment = 100;
    }
  
    return preAssessment;
  }


router.post('/balancesheet', (req, res) => {
    const loanAmount = req.body.loanAmount;
    const BalanceSheetData=req.session.BalanceSheetData
    console.log({BalanceSheetData})
    const preAssessmentValue =calculatePreAssessment(loanAmount,BalanceSheetData)
    console.log({ preAssessment: preAssessmentValue });
    res.json({ preAssessment: preAssessmentValue });
  });
  
  module.exports=router;