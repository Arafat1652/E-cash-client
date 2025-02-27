import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`);
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async (id, isBlocked) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/admin/block-user/${id}`, { isBlocked: !isBlocked });
            setUsers(users.map(user => user._id === id ? { ...user, isBlocked: !isBlocked } : user));
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    const filteredUsers = users.filter(user => user.mobile.includes(search));

    if (loading) return <p className="text-center text-lg">Loading users...</p>;

    return (
        <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Manage Users</h1>

            {/* Search Input */}
            {/* <input
                type="text"
                placeholder="Search by phone number..."
                className="border p-2 mb-4 w-[40%] rounded-lg "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> */}
            {/* search */}
            <div className="relative w-[40%] mx-auto mb-4">
    <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search by phone number.." 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />
    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
    </svg>
  </button>
</div>
            {/* search */}

            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => ( 
                        <tr  key={user._id} className="hover:cursor-pointer"
                        onClick={() => navigate(`/userTransaction/${user.mobile}`)}
                        >
                         {/* <Link key={user.id} to={`userTransaction/${user.mobile}`}> */}
                            <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                            <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user?.image ? (user.image) : "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww"}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.balance} Taka</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.accountType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button 
                                    className={`px-3 py-1 rounded-lg ${user.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                    onClick={() => handleBlockUser(user._id, user.isBlocked)}
                                >
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </td>
                            {/* </Link> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
