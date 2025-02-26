import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
    const { register,handleSubmit,formState: { errors },} = useForm()
    const onSubmit = async(data) => {
      const {mobile, pin} = data
      console.log("Submitting login data:", data); // Check what is being sent
      const loginInfo =  {mobile, pin}
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, loginInfo);
        console.log(res);
    
        if (res.status === 200) {
          // Save user data in localStorage
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          localStorage.setItem("isLoggedIn", "true");
    
          // Redirect to dashboard or home page
          navigate("/dashboard");
    
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed!");
      }
    }

  return (
    <div>
      <div className="w-full max-w-md my-10 p-8 space-y-3 rounded-xl mx-auto bg-base-200">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block">Phone Number</label>
                <input type="number" name="username" id="username" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400" {...register("mobile", { required: true })} />
                {errors.mobile && <span className="text-red-400">This field is required</span>}
            </div>
            <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block">PIN</label>
                <input type="password" name="pin" id="password" placeholder="Enter PIN" className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400" {...register("pin", { required: true })}  />
                {errors.password && <span className="text-red-400">This field is required</span>}
                <div className="flex justify-end text-xs">
                    <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                </div>
            </div>
            <button className="block w-full p-3 text-center rounded-sm bg-[#13e5c0]">Sign in</button>
        </form>
{/* 
        <p className="text-green-500">{successLogin}</p>
        <p className="text-red-400">{loginError}</p> */}

     
        <p className="text-sm text-center sm:px-6">Don not have an account?
            <NavLink to='/register' rel="noopener noreferrer" href="#" className="underline text-primary"> Register</NavLink>
        </p>
    </div>
    </div>
  );
};

export default Login;
