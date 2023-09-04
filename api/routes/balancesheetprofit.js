var express = require("express");
var router = express.Router();
var xero = require('../lib/integrations/xero.js');
var myob = require('../lib/integrations/myob.js');



//year month asset profit
router.get('/:provider/balancesheet',async (req,res)=>{
    const { provider } = req.params;
    console.log({provider});
    if(provider==='xero'){
        const {tenantId,tokenSet}=req.session;
        try{
            const BalanceSheetData=await xero.getBalanceSheet(tenantId,tokenSet);
            console.log('working on req ')
            req.session.BalanceSheetData=BalanceSheetData
            res.json(
                BalanceSheetData
            )
            
        }catch(e){
            console.log('error catched at balancesheetprofit Xero')
            console.log('Please connect to provider for creating accesstoken:accesstoken  may reset')
            console.error(e)
        }
        
// MYOB simulation
    }else if(provider==='myob'){
        const {tenantId,tokenSet}=req.session;
        try{
            const BalanceSheetData=await myob.getReportBalanceSheetandProfit(tenantId,tokenSet);
            console.log('working on Myob review')
            req.session.BalanceSheetData=BalanceSheetData
            res.json(
                BalanceSheetData
            )
            
        }catch(e){
            console.log('error catched at balancesheetprofit MYOB')
            console.error(e)
        }
    }
    
    
})
    
module.exports=router;