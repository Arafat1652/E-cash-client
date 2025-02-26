import { useState, useEffect } from "react";

// Custom hook to get the logged-in user's data
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedLoginStatus = localStorage.getItem("isLoggedIn");

    if (storedUser && storedLoginStatus === "true") {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser)); // ✅ Update localStorage
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  };

  return { user, isLoggedIn, logout, updateUser };
};

export default useAuth;
