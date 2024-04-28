import { createContext, useState, useContext } from 'react';
import { AuthService } from '../api/api.js';


const defaultAuthContext = {
    isAuthenticated: false,
    user: null
};
const AuthInstance = new AuthService();
const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        AuthInstance.login(user).then(resUser => {
            setUser(resUser);
        });
    };

    const logout = () => {
        AuthInstance.logout();
        setUser(null);
    };

    const autologin = () => {
        if (user) {
            return;
        } else {
            AuthInstance.getUserInfo().then(resUser => {
                setUser(resUser);
            }).catch(error => {
                console.error("Failed to fetch user info", error);
            });
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, autologin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);