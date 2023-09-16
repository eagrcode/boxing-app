"use client";

import { createContext, useContext, useState } from "react";

type LogoutModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutModalContext = createContext<LogoutModalContextType | null>(null);

export const useLogoutModalContext = (): LogoutModalContextType => {
  const context = useContext(LogoutModalContext);
  if (!context) {
    throw new Error("useFightData must be used within a FightDataProvider");
  }
  return context;
};

export const LogoutModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // init state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <LogoutModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </LogoutModalContext.Provider>
  );
};
