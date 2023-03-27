import {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback((data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  }, [user]);

  const context = useMemo(() => ({
    user, logIn, logOut, getAuthHeader,
  }), [user, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
