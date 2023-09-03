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
  return {tokenSet,tenantId: xero.tenants[1].tenantId };  
}

//assetvalue and ptofitorloss
async function getBalanceSheet(tenantId,tokenSet){
console.log('at xero.js')

  await xero.setTokenSet(tokenSet)
  await xero.updateTenants(false)
  const getAccountsResponse = await xero.accountingApi.getAccounts(tenantId);
  console.log('accountresponce',getAccountsResponse.body[0]);

  const balsheetDate = "2023-09-02";;
const balsheetPeriods = 7;
const balsheetTimeframe = "MONTH";
const balsheetTrackingOptionID1 = undefined;
const balsheetTrackingOptionID2 = undefined;
const balsheetStandardLayout = true;
const balsheetPaymentsOnly = false;

const getBalanceSheetResponse = await xero.accountingApi.getReportBalanceSheet(tenantId, balsheetDate, balsheetPeriods, balsheetTimeframe, balsheetTrackingOptionID1, balsheetTrackingOptionID2, balsheetStandardLayout, balsheetPaymentsOnly);
const rows = getBalanceSheetResponse.body.reports[0].rows;

// Find the headers (month names)
const headerRow = rows.find(row => row.rowType === 'Header');
const monthHeaders = headerRow.cells.map(cell => cell.value);

const netAssetsSection = rows.find(row => row.rowType === 'Section' && row.title === ''&& row.rows[0].cells[0].value === 'Net Assets'); 
const netAssetsRow = netAssetsSection.rows[0];

const sheet = [];
//code of sheet
// for (let i=1; i<netAssetsRow.cells.length; i++) {

//   const headerCell = headerRow.cells[i];
//   const netAssetValueCell = netAssetsRow.cells[i];
//   const dateformat=headerCell.value.split(' ')
//   const month=dateformat[1];
//   const year=dateformat[2]

//   sheet.push({
//     year,
//     month,
//     profitOrLoss:s,
//     assetsValue: netAssetValueCell.value
//   });
// }

//ProfitorlossAPI

  const plFromDate = "2023-01-01"; 
  const plToDate = "2023-09-02"
  const plPeriods = 7;
  const plTimeframe = "MONTH";
  const plTrackingCategoryID = undefined;
  const plTrackingOptionID = undefined;
  const plTrackingCategoryID2 = undefined;
  const plTrackingOptionID2 = undefined;
  const plStandardLayout = true;
  const plPaymentsOnly = false;
  
  const getProfitAndLossResponse = await xero.accountingApi.getReportProfitAndLoss(tenantId,plFromDate, plToDate, plPeriods, plTimeframe, plTrackingCategoryID, plTrackingOptionID, plTrackingCategoryID2, plTrackingOptionID2, plStandardLayout, plPaymentsOnly );
  const profitloss=getProfitAndLossResponse.body.reports[0]
  const netptofitsection = profitloss.rows.find(row => row.rowType === 'Section' && row.title === '' && row.rows[0].cells[0].value === 'Net Profit');
  const netProfitRow = netptofitsection.rows[0];


  for (let i=1; i<netAssetsRow.cells.length; i++) {
    const headerCell = headerRow.cells[i];
    const netAssetValueCell = netAssetsRow.cells[i];
    const dateformat=headerCell.value.split(' ')
    const month=dateformat[1];
    const year=dateformat[2]
    const netProfitValueCell = netProfitRow.cells[i];


    sheet.push({
      year,
      month,
      profitOrLoss:netProfitValueCell.value,
      assetsValue: netAssetValueCell.value

    });
  console.log({profitOrLoss:netProfitValueCell.value});

  }
  console.log("Net Assets (Month-wise):", sheet);

  return {
    sheet
  };
  //netprofit
   
return 
         
}

module.exports = { getAuthUrl, getTokenSet, initializeXeroClient,getBalanceSheet };
