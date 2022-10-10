import { FC, createContext, useState, useEffect } from "react";

import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
interface FavoriteProvider {
  children: React.ReactNode;
}

interface instance {
  id?: string;
  favorites_id?: string;
}

export interface AppContextInterface {
  id?: string;
  user?: {};
}
const FavoriteContext = createContext<AppContextInterface | object>({});

export const FavoriteProvider = ({ children }: FavoriteProvider) => {
  const [user, setUser] = useState<instance>({});
  const [allFavorite, setAllFavorite] = useState<instance[]>([]);

  const address = useAddress();
  //Fetch uSER
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `https://naijaplaystore.pythonanywhere.com/create-account/${address}`
      );
      setUser(response.data);
      getAllFavorite(response.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all data from
  const getAllFavorite = async (userId: any) => {
    try {
      const res = await axios({
        method: "get",
        url: `https://naijaplaystore.pythonanywhere.com/get-user-favorite/${userId}`,
      });
      // console.log(res.data);
      setAllFavorite(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const render = async () => {
      await getAllUsers();
    };
    render();
  }, [allFavorite]);
  return (
    <FavoriteContext.Provider value={{ allFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
