// MYOB is done only as simulation

//SIMULATION DATAS NOT REAL

// const scopes = "offline_access openid profile email accounting.transactions accounting.budgets.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";
// const myob = new MYOBClient({
//   clientId: "2F960540EB994A6D975E0ADF1CEC7412",
//   clientSecret: "rnYnhEXCcoRt9TS2PQlIqJhRzrnP1N_GGrZVJkfAhSg9kLjx",
//   redirectUris: ["http://localhost:3000/providers/xero/callback"],
//   scopes: scopes.split(" "),
//   httpTimeout: 3000, // ms (optional)
//   clockTolerance: 10, // seconds (optional)
// });

function initialize(){
    return 'intilized'
}

function buildConsentUrl(){
    return 'url verifying'
}
function apiCallback(){
    console.log(
        'creating token set'
    ); 
    return tokenset='eyLHJHUIJFJKJKFHJKHIUHIU4564687HJKKG';
}

function setTokenSet(){
    console.log(
        'verified token set'
    ); 
    return tokenset='eyLHJHUIJFJKJKFHJKHIUHIU4564687HJKKG';
}
async function initializemyobClient() {
  try {
    await initialize(); // Initialize the Myob client
    console.log("Xero client initialized successfully.");
  } catch (error) {
    console.error("Error initializing Xero client:", error);
  }
}

async function getAuthUrl() {
  let consentUrl = await buildConsentUrl();
  return consentUrl;
}
async function getTokenSet(url) {
  const tokenSet = await apiCallback(url);
   myob.tenants.id=1223;
  return {tokenSet,tenantId: myob.tenants.Id };  

}
async function getBalanceSheetandProfit(tenantId, balsheetDate, balsheetPeriods, balsheetTimeframe, balsheetTrackingOptionID1, balsheetTrackingOptionID2, balsheetStandardLayout, balsheetPaymentsOnly) {
   
    console.log('geting balance sheet form MYOB')
    sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },{
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789},{
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345}, {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
    return sheet
  
  }

//assetvalue and ptofitorloss
async function getReportBalanceSheetandProfit(tenantId,tokenSet){


setTokenSet(tokenSet)


const balsheetDate = "";;
const balsheetPeriods = 11;
const balsheetTimeframe = "MONTH";
const balsheetTrackingOptionID1 = undefined;
const balsheetTrackingOptionID2 = undefined;
const balsheetStandardLayout = true;
const balsheetPaymentsOnly = false;

const getBalanceSheetResponse = await getBalanceSheetandProfit(tenantId, balsheetDate, balsheetPeriods, balsheetTimeframe, balsheetTrackingOptionID1, balsheetTrackingOptionID2, balsheetStandardLayout, balsheetPaymentsOnly);
return getBalanceSheetResponse
}

module.exports = { getAuthUrl, getTokenSet,getReportBalanceSheetandProfit };
