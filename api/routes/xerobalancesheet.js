var express = require("express");
var router = express.Router();
var xero = require('../lib/integrations/xero.js');
const providers=require('./providers');
const  axios  = require("axios");


//year month asset
router.get('/:provider/balancesheet',async (req,res)=>{
    const { provider } = req.params;
    console.log({provider})
   


    if(provider==='xero'){
        const {tenantId,tokenSet}=req.session;
        try{
            const BalanceSheetData=await xero.getBalanceSheet(tenantId,tokenSet);
            console.log({BalanceSheetData})
            res.json({
                BalanceSheetData
            })
            
        }catch(e){
            console.error(e)
        }

    }
        
            // const balanceDate=new Date(response1.balanceDate);
        
            // const data={
            //      assetsValue:response1.asset.total,
            //      year:balanceDate.getFullYear(),
            //      month:balanceDate.getMonth() + 1,
            //      profitOrLoss : response2.data.netprofitorloss
        
            // }
           
            
            // console.log(`Year: ${data.year}`);
            // console.log(`Month: ${data.month}`);
            // console.log(`Total Asset Value: ${data.assetsValue}`);
            
       
})
    
module.exports=router;