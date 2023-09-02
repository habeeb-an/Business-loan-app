var express = require("express");
var router = express.Router();
var XeroIntegration = require('../lib/integrations/xero.js');
const providers=require('./providers')
const checkAccessToken=require('../middleware/accesstoken.js')


router.get('/balance-sheet',checkAccessToken,async (req,res)=>{
try{
    

    const responce=await axios.get('https://api.xero.com/api.xro/2.0/Reports/BalanceSheet',{
        headers:{
            Authorization:`Bearer ${tokenSet.access_token}`
        }
    })
}catch(e){
    console.error('Error fetching Balance Sheet:', e);
    res.status(500).json({ error: 'Failed to fetch Balance Sheet' });
}
})
module.exports=router;