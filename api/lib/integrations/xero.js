const { XeroClient } = require('xero-node');

const xero = new XeroClient({
  clientId: '2F960540EB994A6D975E0ADF1CEC7412',
  clientSecret: 'rnYnhEXCcoRt9TS2PQlIqJhRzrnP1N_GGrZVJkfAhSg9kLjx',
  redirectUris: ['http://localhost:3000/providers/xero/callback'],
  scopes: 'openid profile email accounting.reports.read accounting.transactions offline_access'.split(" "),
  httpTimeout: 3000, // ms (optional)
  clockTolerance: 10 // seconds (optional)
});

async function getAuthUrl(){
    let consentUrl = await xero.buildConsentUrl();
    return consentUrl
    
}
async function getTokenSet(url){
  const tokenSet = await xero.apiCallback(url);
  return tokenSet;

}


module.exports ={getAuthUrl,getTokenSet}
