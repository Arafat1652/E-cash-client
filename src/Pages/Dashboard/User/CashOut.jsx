
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

const CashOut = () => {

    const { user, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const { agentMobile, amount, pin } = data;
        const cashOutAmount = Number(amount);

        if (cashOutAmount < 50) {
            return toast.error("Minimum amount to cash out is 50 Taka.");
        }

        const cashOutInfo = {
            userMobile: user.mobile,
            agentMobile,
            amount: cashOutAmount,
            pin
        };
        console.log(cashOutInfo);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/cash-out`, cashOutInfo);
            console.log(res);
            if (res.status === 200) {
                // ✅ Fetch updated user data from backend
                const updatedUserRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user.mobile}`);
                const updatedUser = updatedUserRes.data;

                // ✅ Update frontend state and localStorage
                updateUser(updatedUser);

                toast.success(res.data.message);
                reset();
            } else {
                toast.error("Cash-out Failed!");
            }
        } catch (error) {
            console.error("Error response:", error.response);
            toast.error(error.response?.data?.message || "Cash-out failed!");
        }
    }
    
    return (
        <div className='mt-20'>
        <div>
   <div className="w-full max-w-md my-10 p-8 space-y-3 rounded-xl mx-auto bg-base-200">
     <h1 className="text-2xl font-bold text-center">Cash Out</h1>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div className="space-y-1 text-sm">
             <label htmlFor="username" className="block">Agent Phone Number</label>
             <input type="number" name="username" id="username" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400" {...register("agentMobile", { required: true })} />
             {errors.agentMobile && <span className="text-red-400">This field is required</span>}
         </div>
         <div className="space-y-1 text-sm">
             <label htmlFor="password" className="block">Amount</label>
             <input type="number" min={1} name="amount" id="password" placeholder="Enter Amount" className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400" {...register("amount", { required: true })}  />
             {errors.amount && <span className="text-red-400">This field is required</span>}
         </div>
         <div className="space-y-1 text-sm">
                        <label htmlFor="pin" className="block">Enter Your PIN</label>
                        <input type="password" name="pin" id="pin" placeholder="Account PIN"
                            className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400"
                            {...register("pin", { required: true })} />
                        {errors.pin && <span className="text-red-400">This field is required</span>}
                    </div>
         <button className="block w-full p-3 text-center rounded-sm bg-[#13e5c0]">Tap to Send</button>
     </form>
 </div>
 </div>
     </div>
    );
};

export default CashOut;