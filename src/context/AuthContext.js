import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext({});

const initialState = {
    isAuthenticated: false,
    User: {
        name: "",
        email: "",
        password: "",
        is_user: false,
        is_active: false,
        last_login: "",
        date_joined: "",
        id: "",
        token: "",
    },
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [authenticated, setAuthenticated] = useState(false);

    const login = () => {
        // Your login logic here, e.g., setting authenticated state
        setAuthenticated(true);
        dispatch({ type: 'LOGIN' });
    };

    const logout = () => {
        // Your logout logic here, e.g., clearing authentication state
        setAuthenticated(false);
        dispatch({ type: 'LOGOUT' });
    };

    const getUser = () => {
        const data = localStorage.getItem('data'); 
        const appData = JSON.parse(data);
        if (appData && Object.prototype.hasOwnProperty.call(appData, 'app')){
            return appData.user?.username || null;
        }
        return null;
    };

    const getUserId = () => {
        const data = localStorage.getItem('data'); 
        const appData = JSON.parse(data);
        if (appData && Object.prototype.hasOwnProperty.call(appData, 'app')){
            return appData.user?.userId || null;
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ ...state, authenticated, getUser, getUserId, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};