import { createContext, useContext, useReducer, useState } from "react";
import { authenticationService } from "../api/axios";

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

const SetUserDetailsAuthentication =(token, name, userId, referral_link)=>{
    const data = {
        "app": {
            "alignment": "right",
            "color": "#000"
        },
        "user": {
            "hasConversations": false,
            "locale": location,
            "referral_link": referral_link,
            "username": name,
            "userId": userId,
            "_jwt_": {
                "jwt": token,
            }
        },
    }
    const secret_data = JSON.stringify(data);
    localStorage.setItem('data', secret_data);
    sessionStorage.setItem('data', secret_data);
    document.cookie = `data=${secret_data}; path=/; secure; samesite=strict`;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [authenticated, setAuthenticated] = useState(false);

    const login = () => {
        // Your login logic here, e.g., setting authenticated state
        setAuthenticated(true);
        dispatch({ type: 'LOGIN' });
    };

    const logout = async () => {
        try {
            setAuthenticated(false);
            dispatch({ type: 'LOGOUT' });
            // Send logout request to the backend
            const response = await authenticationService.get('/auth/logout');
            // Check if the response indicates success (status code 200)
            if (response.status == 200) {
                // Clear user data
                SetUserDetailsAuthentication("", "", "", "");
                localStorage.removeItem('data');
                sessionStorage.removeItem('data');
                document.cookie = `data=; path=/; secure; samesite=strict`;

                // Redirect to the home page
                window.location.replace('/');
            } 
            // Update authentication state and dispatch logout action
            setAuthenticated(false);
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Error during logout:', error);
        }
      
    };

    const getUsername = () => {
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
        <AuthContext.Provider value={{ ...state, authenticated, SetUserDetailsAuthentication, getUsername, getUserId, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
