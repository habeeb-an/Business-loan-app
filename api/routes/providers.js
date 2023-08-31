var express = require("express");
var router = express.Router();
var XeroIntegration = require('../lib/integrations/xero.js');
const prisma = require("../prisma.js");


router.get("/:provider/connect", async (res, req) => {
  const { provider } = req.params;

  if (provider === "Xero") {
    const consentUrl= await XeroIntegration.getAuthUrl();
    res.redirect(consentUrl);
    console.log(consentUrl);

  }
});

router.get("/:provider/callback",async (res, req) => {
    
    try{
        const tokenSet = await xero.apiCallback(req.url);
        const tokenSave= await prisma.oAuth2Token.create({
            data:{
                id_token,
                access_token,
                expires_in,
                token_type,
                refresh_token,
                // scope
            }
        })
        res.status(201).json({
            status:"success",
            message:"Token successfully registered!",
            data:{
                id_token: tokenSave.id_token,
                access_token: tokenSave.access_token,
                expires_in: tokenSave.expires_in,
                token_type: tokenSave.token_type,
                refresh_token: tokenSave.refresh_token,
              }
            })

    }catch(error){
        console.error(error)
    res.status(500).json({

        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later."
    })

    }
});
