import { createContext, useState, type ReactNode } from "react";

type AuthContextType = {
  accesToken: string | null;
  setAccessToken: (token:string | null) => void;
  user: {id:string; email:string; name: string;} | null;
  setUser: (user: AuthContextType['user']) => void;
}

 export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [accesToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType['user'] | null>(null);

  return (
    <AuthContext.Provider value={{accesToken, setAccessToken, user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}