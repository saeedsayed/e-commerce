"use client";
import { IUser } from "@/types";
import React, { createContext, use, useContext, useEffect } from "react";
import { deleteCookie, getCookie } from "cookies-next";

type Props = {
  children: React.ReactNode;
};

interface IAuthContext {
  user: IUser | null;
  updateUser: (newUser: IUser | null) => void;
  status: "loading" | "authenticated" | "unauthenticated";
}

const authProvider = createContext<IAuthContext>({
  user: null,
  updateUser: () => {},
  status: "loading",
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [status, setStatus] = React.useState<IAuthContext["status"]>("loading");

  const updateUser = (newUser: IUser | null) => {
    if (newUser) {
      setStatus("authenticated");
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      setStatus("unauthenticated");
      localStorage.removeItem("user");
      deleteCookie("token");
    }
    setUser(newUser);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = getCookie("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("unauthenticated");
      deleteCookie("token");
      localStorage.removeItem("user");
    }
  }, []);
  return (
    <authProvider.Provider value={{ user, updateUser, status }}>
      {children}
    </authProvider.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(authProvider);
