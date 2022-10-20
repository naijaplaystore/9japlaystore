import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2, NAVIGATION_DEMO_3 } from "data/navigation";
import { useAddress } from "@thirdweb-dev/react";

function Navigation() {
  const address = useAddress();
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {!address
        ? NAVIGATION_DEMO_2.map((item) => (
            <NavigationItem key={item.id} menuItem={item} />
          ))
        : NAVIGATION_DEMO_3.map((item) => (
            <NavigationItem key={item.id} menuItem={item} />
          ))}
    </ul>
  );
}

export default Navigation;
