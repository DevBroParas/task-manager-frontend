import { createContext, useContext, useEffect, useState } from "react";
import { me, logout as apiLogout } from "../services/authService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // to store the user data
    const [loading, setLoading] = useState(true); // tracks if auth info is loading

    useEffect(() => {
        const fetchUser = async () => {
            try {
               
                const res = await me();
                setUser(res.data.user);
            } catch (error) {
               console.error('AuthContext Error',error)
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (userData) => setUser(userData); // login and set the user
    const logout = async () => {
        await apiLogout(); // make sure to logout on the backend as well
        setUser(null); // clear user state
    };

    // Render the children only after the loading state is set to false
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {!loading ? children : <p>Loading...</p>} {/* Shows loading text while checking auth */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
