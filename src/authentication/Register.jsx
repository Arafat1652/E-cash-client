import { NavLink, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate()
  const [regError, setRegError] = useState("");
  const [successReg, setSuccessReg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, pin, fullName, image, phoneNumber, nidNumber,accountType } = data;
    console.log(data);
    const userInfo = {
        name: fullName,
        image,
        mobile: phoneNumber,
        email,
        nid: nidNumber,
        accountType,
        pin,
        balance: 40,
        status: 'Created'
      };
      console.log(userInfo);

      if (!/^\d{5}$/.test(pin)) {
        return toast.error('PIN must be exactly 5 digits');
      
      }
      

      axios.post(`${import.meta.env.VITE_API_URL}/user`, userInfo)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          toast.success(res.data.message || "Registration successful!"); 
          // reset(); // Uncomment this if you have a form reset function
          navigate("/dashboard"); // Uncomment this if you want to navigate to another page
          localStorage.setItem("userData", JSON.stringify(userInfo));
          localStorage.setItem("isLoggedIn", "true");
        }else{
          toast.error(res.data.message)
        }
      })
      .catch((error) => {
        toast.error(error.message)
      });
     
    
  };

  return (
    <div>
      <div className="w-full max-w-md my-10 p-8 space-y-3 rounded-xl mx-auto bg-base-200 ">
        <h1 className="text-2xl font-bold text-center ">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block ">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block ">
              Phone Number
            </label>
            <input
              type="number"
              name="username"
              id="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block ">
              Email
            </label>
            <input
              type="email"
              name="username"
              id="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block text-gray-400">Photo URL</label>
                <input type="text" name="username" id="image" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400" {...register("image", { required: true })}/>
                {errors.image && <span className="text-red-400">This field is required</span>}
            </div>
          
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block ">
              NID Number
            </label>
            <input
              type="number"
              name="username"
              id="nid"
              placeholder="NID Number"
              className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400"
              {...register("nidNumber", { required: true })}
            />
            {errors.nidNumber && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="">Account Type</label>
            <select className="select select-bordered w-full max-w-xs" {...register("accountType", { required: true })}>
              <option>user</option>
              <option>agent</option>
            </select>
            {errors.nidNumber && (
              <span className="text-red-400"><br />This field is required</span>
            )}
          </div>
            
          
          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block ">
              5 Digit PIN
            </label>
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Enter PIN"
              className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400"
              {...register("pin", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400">This field is required</span>
            )}

            <span
              className="absolute top-9 right-4 text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
          </div>
          <button className="block w-full p-3 text-center rounded-sm  bg-[#13e5c0]">
            Register
          </button>
        </form>

        {/* <p className="text-green-500">{successReg}</p>
        <p className="text-red-400">{regError}</p> */}

        <p className="text-sm text-center sm:px-6 ">
          Already have an account?
          <NavLink
            to="/"
            rel="noopener noreferrer"
            href="#"
            className="underline text-primary"
          >
            {" "}
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
