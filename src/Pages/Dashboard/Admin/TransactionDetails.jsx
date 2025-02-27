import { Link, useLoaderData } from "react-router-dom";


const TransactionDetails = () => {
    const transactions =  useLoaderData()
    console.log(transactions);
    return (
        <div className="mt-20">
         <div className="text-center mb-4">
         <Link to='/dashboard/manage-users'
        className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
            </path>
        </svg>
        <span className="ml-1 font-bold text-lg">Back To Users</span>
    </Link>
         </div>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Account</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">TransactionId</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Type</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Amount</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {transactions.length > 0 ? (
                            transactions.map((txn, index) => (
                                <tr key={index}>
                                    <td className="py-4 px-6 border-b border-gray-200">{txn.from}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{txn.transactionType}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{txn.transactionId}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{txn.amount} Taka</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{new Date(txn.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionDetails;