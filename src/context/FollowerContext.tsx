import { createContext, useState, useEffect } from "react";
import { AppContextInterface } from "./FvoriteContext";

interface FollowerProviders {
  children: React.ReactNode;
}

const FollowerContext = createContext<string | object>({});

export const FollowerProvider = ({ children }: FollowerProviders) => {
  return (
    <FollowerContext.Provider value={"follower"}>
      {children}
    </FollowerContext.Provider>
  );
};
export default FollowerContext;
