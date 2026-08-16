import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and check token validity on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          
          // Verify with server in background to get latest user details
          const response = await API.get("/users/profile");
          if (response.data?.success && response.data?.user) {
            const updatedUser = response.data.user;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error("Session verification failed:", error);
          // If profile fails, clean up
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      
      if (response.data?.success && response.data?.token) {
        const { token: userToken, user: userData } = response.data;
        
        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        
        setToken(userToken);
        setUser(userData);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true, user: userData };
      }
      throw new Error(response.data?.message || "Login failed");
    } catch (error) {
      setIsLoading(false);
      const message = error.response?.data?.message || error.message || "Invalid credentials";
      return { success: false, error: message };
    }
  };

  // Register handler
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/register", { name, email, password });
      setIsLoading(false);
      
      if (response.data?.success) {
        return { success: true, message: response.data.message };
      }
      throw new Error(response.data?.message || "Registration failed");
    } catch (error) {
      setIsLoading(false);
      const message = error.response?.data?.message || error.message || "Registration failed";
      return { success: false, error: message };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  // Helper function to update current user state manually (e.g. on profile update)
  const updateCurrentUser = (updatedUser) => {
    const freshUser = { ...user, ...updatedUser };
    setUser(freshUser);
    localStorage.setItem("user", JSON.stringify(freshUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
