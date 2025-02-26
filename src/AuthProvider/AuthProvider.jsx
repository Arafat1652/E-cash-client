import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log('user',user);
    // Function to fetch user data
    const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
    
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/current-user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user);
        } catch (error) {
            // console.error("Error fetching user:", error);
            localStorage.removeItem("authToken"); // ✅ Remove invalid token
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(); // Call this on app load
    }, []);

    
    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;
