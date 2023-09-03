var express = require("express");
var router = express.Router();

async function getDecision(tokenSet,businessName,yearEstablished,preAssessment,profitLossSummary){
// decisionengine API call
return "decison function call"
}

router.post('/connect-decision', async (req, res) => {
    const {businessName,yearEstablished,preAssessment}=req.body
    const {BalanceSheetData,tokenSet}=req.session;
    const profitLossSummary = BalanceSheetData?.map(entry => ({
        year: entry.year,
        profitOrLoss: entry.profitOrLoss,
      }));
      const decision=await getDecision(tokenSet,businessName,yearEstablished,preAssessment,profitLossSummary)
      res.json({
        decision
      })
      console.log('decison engine working');
})
module.exports=router;