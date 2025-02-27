
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const {user} = useAuth() 
  console.log('useauthheree',user);
  if(!user) return <LoadingSpinner/>

  return (
    <div>
        <h1>Welcome, {user.name}</h1>
        <p>Mobile: {user.mobile}</p>
        <p>Email: {user.email}</p>
      {/* {/* Add more user details here */}
    </div>
  );
};

export default Dashboard;