import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
