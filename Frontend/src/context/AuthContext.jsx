import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveUser } from "../redux/slice/userSlice";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Retrieve the authentication state from sessionStorage on initial load
        const savedState = sessionStorage.getItem("isAuthenticated");
        return savedState === "true";
    });

    const [role, setRole] = useState(() => {
        return sessionStorage.getItem("role") || "";
    })

    const [jwtToken, setJwtToken] = useState(() => {
        // Retrieve the JWT token from sessionStorage on initial load
        return sessionStorage.getItem("jwtToken") || "";
    });

    const navigator = useNavigate();

    useEffect(() => {
        // Save authentication state and JWT token to sessionStorage whenever they change
        sessionStorage.setItem("isAuthenticated", isAuthenticated);
        sessionStorage.setItem("jwtToken", jwtToken);
        sessionStorage.setItem("role", role)
    }, [isAuthenticated, jwtToken, role]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            console.log(response);
            if (response.status === 200) {
                setJwtToken(response.data.token);
                setIsAuthenticated(true);
                setRole(response.data.role)
                toast.success("Login Successful..!");
                dispatch(saveUser(response.data))
                navigator("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setJwtToken("");
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("jwtToken");
        toast.success('Logged out..!')
        navigator("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, login, logout, role }}>
            {children}
        </AuthContext.Provider>
    );
};
