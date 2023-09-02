const { XeroClient } = require("xero-node");
const scopes = "offline_access openid profile email accounting.transactions accounting.budgets.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";
const xero = new XeroClient({
  clientId: "2F960540EB994A6D975E0ADF1CEC7412",
  clientSecret: "rnYnhEXCcoRt9TS2PQlIqJhRzrnP1N_GGrZVJkfAhSg9kLjx",
  redirectUris: ["http://localhost:3000/providers/xero/callback"],
  scopes: scopes.split(" "),
  httpTimeout: 3000, // ms (optional)
  clockTolerance: 10, // seconds (optional)
});

async function initializeXeroClient() {
  try {
    await xero.initialize(); // Initialize the Xero client
    console.log("Xero client initialized successfully.");
  } catch (error) {
    console.error("Error initializing Xero client:", error);
  }
}

async function getAuthUrl() {
  let consentUrl = await xero.buildConsentUrl();
  return consentUrl;
}
async function getTokenSet(url) {
  const tokenSet = await xero.apiCallback(url);
  await xero.updateTenants(false)
  console.log({tenants:xero.tenants});
  return {tokenSet,tenantId: xero.tenants[1].tenantId };  
}

async function getBalanceSheet(tenantId,tokenSet){
  console.log({tokenSet})
  await xero.setTokenSet(tokenSet)

  const balanceSheet = await xero.financeApi.getFinancialStatementBalanceSheet(tenantId);
  const profitOrLoss = await xero.financeApi.getFinancialStatementProfitAndLoss(tenantId);
  
  console.log({balanceSheet,profitOrLoss})
  const balanceDate=new Date(balanceSheet.balanceDate);
  return{
                 assetsValue:balanceSheet.asset.total,
                 year:balanceDate.getFullYear(),
                 month:balanceDate.getMonth() + 1,
                 profitOrLoss : profitOrLoss.netprofitorloss
        
            }
           
}

module.exports = { getAuthUrl, getTokenSet, initializeXeroClient,getBalanceSheet };
