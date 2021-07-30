import { createContext } from "react";
import { IStorage } from "../hooks/auth.hook";

interface IContextProps {
    login: (jwtToken: string, id: string) => void
    logout: () => void
    userData: IStorage | undefined
  }

export const AuthContext = createContext({} as IContextProps)