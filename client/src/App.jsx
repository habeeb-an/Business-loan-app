import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL|| 'http://localhost:3000';
axios.defaults.withCredentials=true;
function App() {
  const [businessName, setBusinessName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('Xero');
  const [loanAmount, setLoanAmount] = useState('');
  const [preAssessment, setPreAssessment] = useState('test');
  const [profitLossSummary, setProfitLossSummary] = useState([]);
  const [BalancesheetYear, setBalancesheetYear] = useState('');
  const [BalancesheetMonth, setBalancesheetMonth] = useState('');
  const [assetsValue, setassetsValue] = useState('');
  

  async function providerconnect(){
    try {
      const response = await axios.get('/providers/xero/connect');
      console.log(response.data);
      location.href = response.data.consentUrl
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/balance-sheet/xero/balancesheet', {
        // businessName,
        // yearEstablished,
        // accountingProvider,
        // loanAmount: parseFloat(loanAmount),
        params: {

        },
      });
      console.log(response.data);
      location.href = response.data.consentUrl
      setProfitLossSummary(response.data.profitOrLoss);
      setBalancesheetMonth(response.data.year)
      setBalancesheetYear(response.data.month)
      setassetsValue(response.data.assetsValue)
      
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
              <option id='Xero'value="Xero">Xero</option>
              <option id='MYOB' value="MYOB">MYOB</option>
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
              
            />
          </div>
          <div className='text-center'>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white rounded py-2 px-4 mt-4"
          >
            Submit Application
          </button>
          </div>
        </form>

        {preAssessment !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Application Result</h2>
            <p><span className="font-semibold">Business Name:</span> {businessName}</p>
            <p><span className="font-semibold">Year Established:</span> {yearEstablished}</p>
            <p><span className="font-semibold">BalancesheetMonth:</span> {BalancesheetMonth}</p>
            <p><span className="font-semibold">BalancesheetYear:</span> {BalancesheetYear}</p>
            <p><span className="font-semibold">assetsValue:</span> {assetsValue}</p>
            <p><span className="font-semibold">profitLossSummary:</span> {profitLossSummary}</p>

            <h3 className="text-lg font-semibold mt-4">Profit/Loss Summary</h3>
            <ul className="list-disc pl-6 mt-2">
              {profitLossSummary.map((entry, index) => (
                <li key={index}>
                  Year: {entry.year}, Month: {entry.month}, Profit/Loss: {entry.profitOrLoss}, Assets Value: {entry.assetsValue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;