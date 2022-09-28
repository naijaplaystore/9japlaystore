import { FC, createContext, useState, useEffect } from "react";

import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";

interface UserProvider {
  children: React.ReactNode;
}

interface instance {
  id?: string;
  favorites_id?: string;
}

interface AppContextInterface {
  id?: string;
  user?: {};
}

const UserContext = createContext<AppContextInterface | object>({});

export const UserProvider = ({ children }: UserProvider) => {
  const [user, setUser] = useState<any>({});
  //   const user: any = [];

  const address: any = useAddress();
  //Fetch uSER

  const getAllUsers = async (addr: any) => {
    // setIsLoading(true);
    if (addr === undefined) {
      //   console.log("loading... ");
    } else {
      const url = `https://naijaplaystore.pythonanywhere.com/create-account/${addr}`;
      try {
        const res = await axios.get(url);
        //   getUser(res.data);
        setUser(res.data);
        // console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getAllUsers(address);
  });

  //   console.log(user);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
