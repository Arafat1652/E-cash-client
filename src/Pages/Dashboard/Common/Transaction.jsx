import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Transaction = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.mobile) return;  // Ensure user is available

        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-transaction/${user.mobile}`);
                setTransactions(res.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };

        fetchTransactions();
    }, [user?.mobile]);  // Optional chaining to prevent errors

    if (!user) return <LoadingSpinner/>;
    if (loading) return <p>Fetching transactions...</p>;

    return (
        <div className='mt-20'>
            <h1 className="text-center text-3xl text-pink-700 font-bold mb-4">My All Transactions</h1>
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

export default Transaction;
