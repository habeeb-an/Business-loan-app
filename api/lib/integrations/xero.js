const { XeroClient } = require('xero-node');

const xero = new XeroClient({
  clientId: '2F960540EB994A6D975E0ADF1CEC7412',
  clientSecret: 'rnYnhEXCcoRt9TS2PQlIqJhRzrnP1N_GGrZVJkfAhSg9kLjx',
  redirectUris: ['https://4c86-117-255-103-83.ngrok-free.app/integration/xero/callback'],
  scopes: 'openid profile email accounting.reports.read accounting.transactions offline_access'.split(" "),
  state: 'returnPage=my-sweet-dashboard', // custom params (optional)
  httpTimeout: 3000, // ms (optional)
  clockTolerance: 10 // seconds (optional)
});

async function getAuthUrl(){
    let consentUrl = await xero.buildConsentUrl();
    return consentUrl
    
}

module.exports ={getAuthUrl}