import  { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    const AppContext = createContext();

export const AppProvider =({ children })=>{
    
   const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // Ambil token & user dari localStorage saat app mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token) {
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        if (userData) {
        setUser(JSON.parse(userData));
        }
    }, []);

    const fetchBlogs = async () => {
        try {
        const { data } = await axios.get("/api/blog/all");
        if (data.success) setBlogs(data.blogs);
        else toast.error(data.message);
        } catch (err) {
        console.log(err);
        toast.error(err.message);
        }
    };

    const handleLoginSuccess = (data) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        if (data.user?.role === "admin") navigate("/admin");
        else navigate("/client");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = "";
        setToken(null);
        setUser(null);
    };

    const value = {
        axios,
        token,setToken,
        user,setUser,
        blogs,setBlogs,
        input,setInput,
        navigate,handleLoginSuccess,
        logout,fetchBlogs,
    }

    return ( 
        
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> {
    return useContext(AppContext);
}