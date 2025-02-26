import { CgProfile } from "react-icons/cg";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  console.log(user);

  const [totalBalance, setTotalBalance] = useState(null);

  useEffect(() => {
    if (user?.accountType === "admin") {
      // Fetch total balance for admin
      fetch(`${import.meta.env.VITE_API_URL}/total-balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setTotalBalance(data.totalBalance))
        .catch((error) => console.error("Error fetching total balance:", error));
    }
  }, [user]);

  if (!user) return <p>loading ...</p>;
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 mt-30">
                <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl text-blue-900">
                        Your <strong>Balance</strong>
                    </h2>
                    <span
      className="inline-block mt-8 px-8 py-2 w-[30%]  text-xl font-bold text-white bg-indigo-800 cursor-pointer select-none"
      onClick={() => setShowBalance(!showBalance)}
    >
      <span className={`${showBalance ? "blur-0" : "blur-md"} transition-all duration-300`}>
        {user.balance} tk
      </span>
    </span>
                </div>

                {
                    user.accountType == 'admin'? <> <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl text-blue-900">
                    System Total Balance
                    </h2>
                    <div className="mt-8 text-xl font-bold text-white bg-blue-800 py-2 px-8 w-[30%]">
              {totalBalance !== null ? `${totalBalance} tk` : "Loading..."}
            </div>
                </div></> :  <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl text-blue-900">
                    Transaction 
                    </h2>
                    <a href="#" className="inline-block mt-8 px-8 py-2 text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform">
                        23
                    </a>
                </div>
                }  
            </div>
      <div className="p-16">
        <div className="p-8 bg-white shadow">
        <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: globe-alt --> */}
                            <CgProfile size={25} />

                        </div>
                    </div>
                    <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                            Account Type
                        </dt>
                        <dd className="mt-2 text-base text-[#eb6c30] font-bold">
                            {user.accountType.toUpperCase()}
                        </dd>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: phone --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>

                        </div>
                    </div>
                    <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                            Phone number
                        </dt>
                        <dd className="mt-2 text-base text-[#eb6c30] font-bold">
                            {user.mobile}
                        </dd>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: mail --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>

                        </div>
                    </div>
                    <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                            Email
                        </dt>
                        <dd className="mt-2 text-base text-[#eb6c30] font-bold">
                            {user.email}
                        </dd>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            {/* <!-- Heroicon name: clock --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </div>
                    </div>
                    <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                            Store Hours
                        </dt>
                        <div className="mt-2 text-base text-gray-500">
                            Monday - Friday: 9am to 8pm<br/>
                            Saturday: 10am to 6pm<br/>
                            Sunday: 12pm to 4pm
                        </div>
                    </div>
                </div>
            </dl>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
