import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL|| 'http://localhost:3000';
axios.defaults.withCredentials=true;
function App() {
  const [businessName, setBusinessName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('xero');
  const [loanAmount, setLoanAmount] = useState('');
  const [preAssessment, setPreAssessment] = useState(null);
  const [profitLossSummary, setProfitLossSummary] = useState([]);
  const [BalancesheetYear, setBalancesheetYear] = useState('');
  const [BalancesheetMonth, setBalancesheetMonth] = useState('');
  const [assetsValue, setassetsValue] = useState('');
  const [sheet, setSheet] = useState('');
  
  async function  decisionEngine(){
    try{
      const decision=await axios.post(`/decisionengine/connect-decision`,{
        businessName,
        yearEstablished,
        preAssessment,
      });
      
    }catch (error) {
      console.error('Error at decision engine:', error);
    }
  }
 
  async function providerconnect(){
    try {
      const response = await axios.get(`/providers/${accountingProvider}/connect`);
      console.log(response.data);
      location.href = response.data.consentUrl
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/balance-sheet/${accountingProvider}/balancesheet`, {
        params: {
          

        },
      });
      {}
      setSheet(response.data)
      console.log(response.data);

      const response2 = await axios.post('/preassessment/balancesheet', {
        loanAmount: loanAmount, 
      });
      setPreAssessment(response2.data.preAssessment)
      

      // location.href = response.data.consentUrl

      
    } catch (error) {
      console.error('Error:', error);
    }
  };


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Business Loan Application</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              className="mt-1 p-2 border rounded-md w-full"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700">
              Year Established
            </label>
            <input
              type="number"
              id="yearEstablished"
              className="mt-1 p-2 border rounded-md w-full"
              value={yearEstablished}
              onChange={(e) => setYearEstablished(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountingProvider" className="block text-sm font-medium text-gray-700">
              Accounting Provider
            </label>
            <select
              id="accountingProvider"
              className="mt-1 p-2 border rounded-md w-full"
              value={accountingProvider}
              onChange={(e) => setAccountingProvider(e.target.value)}
              required
            >
              <option id='xero'value="xero">Xero</option>
              <option id='MYOB' value="MYOB">MYOB:not ready</option>
            </select>
          </div>
          <div className='text-center'>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-900 text-white  rounded py-2 p-4 mt-4"
             onClick={()=>providerconnect()}
          >
            Connect Provider
          </button>
          </div>
          <div className="my-4">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Requested Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              className="mt-1 p-2 border rounded-md w-full"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
              
            />
          </div>
          <div className='text-center'>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white rounded py-2 px-4 mt-4"
          >
            Review Details
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-800 text-white rounded py-2 px-4 m-4"
            onClick={()=>decisionEngine()}
            >
            Submit to Decision engine
          </button>
          
          </div>
        </form>

        {preAssessment !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Application Review</h2>
            <p><span className="font-semibold">Business Name:</span> {businessName}</p>
            <p><span className="font-semibold">Year Established:</span> {yearEstablished}</p>
            <p><span className="font-semibold">Presassessment Value:</span> {preAssessment}%</p>
           
            <h3 className="text-lg font-semibold mt-4">Summary</h3>
            {sheet && sheet.length > 0 &&(
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets Value</th>
          </tr>
        </thead>
        <tbody>
          {sheet.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.month}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.profitOrLoss}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.assetsValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;