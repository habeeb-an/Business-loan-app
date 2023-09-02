var express = require("express");
var router = express.Router();
var xero = require('../lib/integrations/xero.js');
const prisma = require("../prisma.js");
const { axios } = require("axios");


router.get("/:provider/connect", async (req,res) => {
  try {
    
  const { provider } = req.params;
        console.log({provider})
  if (provider === "xero") {
    const consentUrl= await xero.getAuthUrl();
    console.log('consentURL =',consentUrl);
    res.json({consentUrl});
  }
  }catch(error){
    console.error('Error generating consent URL:', error);
    res.status(500).json({ error: 'Failed to generate consent URL' });
  }
});

router.get("/:provider/callback",async (req,res) => {
  const { provider } = req.params;
 

  if(provider==='xero'){
    try{
      const {tokenSet,tenantId} = await xero.getTokenSet(req.url)
      console.log({tokenSet});
          
      //storing  the token in session
      req.session.tokenSet = tokenSet;
      req.session.tenantId= tenantId;


      
    
     await xero.initializeXeroClient();

      



      // const tokenSave= await prisma.oAuth2Token.create({
      //     data :{
      //         id_token:tokenSet.id_token,
      //         access_token:tokenSet.access_token,
      //         expires_in:tokenSet.expires_in,
      //         token_type: tokenSet.token_type,
      //         refresh_token: tokenSet.refresh_token,
      //         provider,
      //          }
      // })
      res.status(201)
      res.redirect('http://localhost:5173/')

  
}catch(error){
      console.error(error)
  res.status(500).json({

      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred@providercallback. Please try again later."
  })
}
    }
    

});
module.exports=router

