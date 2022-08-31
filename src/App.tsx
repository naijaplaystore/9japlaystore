import React from "react";
import MyRouter from "routers/index";

import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
      <Toaster />
    </div>
  );
}

export default App;
