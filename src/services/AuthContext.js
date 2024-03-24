import React, { createContext, useState } from 'react';
import { login } from './auth.tsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => 
{
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [credType, setCredType] = useState(null);
  const [credName, setCredName] = useState(null);

  const doLogin = async (email, password) => 
  {
    try {
            const res = await login(email, password);
            
            setUser(res);
            setToken(res.token);
            setCredType(res.data.cred_type);
            setCredName(res.data.cred_name);

            return {code: 200, data: res.data};
        } 
        catch (error) 
        {
            if (error.response && error.response.status === 401) 
            {
                // Handle invalid login credentials
                return {code: 401, data: "Invalid login credentials"};
            } 
            else 
            {
                // Handle other errors
                return {code: 500, data: "Server error"};
            }
        }
    };

    return (
            <AuthContext.Provider value={{ user, doLogin, token, credType, credName }}>
            {children}
            </AuthContext.Provider>
    );
};