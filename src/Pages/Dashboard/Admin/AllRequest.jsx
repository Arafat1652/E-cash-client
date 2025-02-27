import { useEffect, useState } from "react";
import axios from "axios";
const AllRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgentRequests();
    }, []);

    const fetchAgentRequests = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/agents`);
            setRequests(res.data);
        } catch (error) {
            console.error("Error fetching agent requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (id, status) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/agents/${id}`, { status });
            setRequests(requests.map(req => req._id === id ? { ...req, status } : req));
        } catch (error) {
            console.error("Error updating request:", error);
        }
    };

    if (loading) return <p>Loading agent requests...</p>;
    return (
        <div>
             <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Agent Approval Requests</h1>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{req.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{req.mobile}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{req.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{req.nid}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === "approved" ? "bg-green-100 text-green-800" : req.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                                    {req.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {req.status === "pending" && (
                                    <>
                                        <button 
                                            className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                                            onClick={() => handleApproval(req._id, "approved")}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                            onClick={() => handleApproval(req._id, "rejected")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AllRequest;