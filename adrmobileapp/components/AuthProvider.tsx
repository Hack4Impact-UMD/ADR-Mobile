import {
    getAuth,
    onIdTokenChanged,
    type User,
    type IdTokenResult,
  } from "@firebase/auth";
  import React, { createContext, useContext, useEffect, useState } from "react";
  
  interface Props {
    children: JSX.Element;
  }
  
  interface AuthContextType {
    user: User;
    token: IdTokenResult;
    loading: boolean;
  }
  
  // The AuthContext that other components may subscribe to.
  const AuthContext = createContext<AuthContextType>(null!);
  
  // Updates the AuthContext and re-renders children when the user changes.
  // See onIdTokenChanged for what events trigger a change.
  export const AuthProvider = ({ children }: Props): React.ReactElement => {
    const [user, setUser] = useState<User | any>(null!);
    const [token, setToken] = useState<IdTokenResult>(null!);
    // The loading state is used by RequireAuth/RequireAdminAuth
    const [loading, setLoading] = useState<boolean>(true);
    const providerProps = React.useMemo(() => {
      return { user, token, loading };
    }, [user, token, loading]);
  
    useEffect(() => {
      const auth = getAuth();
      onIdTokenChanged(auth, (newUser) => {
        setUser(newUser);
        if (newUser != null) {
          newUser
            .getIdTokenResult()
            .then((newToken) => {
              setToken(newToken);
            })
            .catch(() => {});
        }
        setLoading(false);
      });
    }, []);
  
    return (
      <AuthContext.Provider value={providerProps}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };