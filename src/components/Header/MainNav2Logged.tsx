import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Navigation from "shared/Navigation/Navigation";
import { useAddress, useListings, useMarketplace } from "@thirdweb-dev/react";
import { Link, useHistory } from "react-router-dom";
// import useSearch from "../../useHooks/useSearch";
import axios from "axios";

import { MARKETPLACE_ID } from "key";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const marketplace = useMarketplace(
    MARKETPLACE_ID // Your marketplace contract address here
  );

  //Connect your wallet
  const address: any = useAddress();
  const history = useHistory();
  const [searchData, setSearchData] = React.useState<any>([]);
  const { data: listings, isLoading: loadingListings } =
    useListings(marketplace);
  const [isSearch, setIsSearch] = React.useState(false);

  // Save address to database
  const saveAddress = async (addr: any) => {
    const url = `https://naijaplaystore.pythonanywhere.com/create-account/${addr}`;
    try {
      const res = await axios.get(url);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  if (address !== undefined) {
    saveAddress(address);
  }

  // Search Nfts
  const searchNft = (e: any) => {
    const listing = listings?.filter((data) => {
      return data.asset.name?.toLowerCase().includes(e.target.value);
    });

    setIsSearch(true);

    console.log(listing);
    e.target.value === "" ? setSearchData([]) : setSearchData(listing);
  };
  // View music nft
  const onViewMusic = (id: number) => {
    history.push(`/nft-detailt/${id}`);
    setIsSearch(false);
  };

  return (
    <div className={`nc-MainNav2Logged relative z-10 ${"onTop "}`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden sm:block flex-grow max-w-xs relative">
            <form>
              <Input
                type="search"
                placeholder="Search items"
                className="pr-10 w-full"
                sizeClass="h-[42px] pl-4 py-3"
                onChange={searchNft}
              />
              <input type="submit" hidden value="" />
            </form>
            {isSearch && (
              <div className="absolute w-full dark:bg-[#111827] bg-gray-100 z-50 ">
                {loadingListings ? (
                  <p>loading music.....</p>
                ) : (
                  searchData?.map((data: any) => (
                    <div
                      className=" "
                      key={data.id}
                      onClick={() => {
                        onViewMusic(data.id);
                      }}
                    >
                      <div className="p-2 dark:hover:bg-gray-200 hover:bg-[#111827] dark:hover:text-gray-900 hover:text-gray-200 cursor-pointer rounded-md">
                        <div className="flex gap-2">
                          <img
                            src={data.asset.image}
                            alt="nft img"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <p className="py-3"> {data.asset.name}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">
            <Navigation />
            <div className="hidden sm:block h-6 border-l border-neutral-300 dark:border-neutral-6000"></div>
            <div className="flex">
              <SwitchDarkMode />
              {/* <NotifyDropdown /> */}
            </div>
            <div></div>
            {!address ? (
              <Link to={"/connect-wallet"}>
                <ButtonPrimary sizeClass="px-4 py-2 sm:px-5">
                  Connect Wallet
                </ButtonPrimary>
              </Link>
            ) : (
              <AvatarDropdown />
            )}
            <div></div>
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            {/* <NotifyDropdown /> */}
            <SwitchDarkMode />
            {address && <AvatarDropdown />}

            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2Logged;
