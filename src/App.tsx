import React from "react";
import MyRouter from "routers/index";

import { Toaster } from "react-hot-toast";
import { UserProvider } from "context/UserContext";
import { FavoriteProvider } from "context/FvoriteContext";
function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <UserProvider>
        <FavoriteProvider>
          <MyRouter />
        </FavoriteProvider>
      </UserProvider>

      <Toaster />
    </div>
  );
}

export default App;
