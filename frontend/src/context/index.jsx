import { createContext } from 'react';
import { useContext } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;