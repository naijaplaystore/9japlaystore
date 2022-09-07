import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
import { nftsImgs } from "contains/fakeData";
import MySwitch from "components/MySwitch";
import { useHistory } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import toast from "react-hot-toast";
import { useNFTs, useNFTCollection, useAddress } from "@thirdweb-dev/react";
import { COLLECTION_ID, MARKETPLACE_ID } from "../key";
import {
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
  ChainId,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export interface ListNFTProps {
  className?: string;
}

const plans = [
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[0],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[1],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[2],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[3],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[4],
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: nftsImgs[5],
  },
];

const ListNFT: FC<ListNFTProps> = ({ className = "" }) => {
  // dynamic routing
  const history = useHistory();

  // intialized state
  const [selected, setSelected] = useState(plans[1]);
  const [nftID, setNftID] = useState("" as any);
  const [data, setData] = useState({
    price: "",
    quantity: "",
  }) as any;
  const [listing, setListing] = useState<string>("auctionlisting");
  const [loading, setLoading] = useState(false);

  // Use the NFTs component to get the list of NFTs

  const nftCollection = useNFTCollection(COLLECTION_ID);
  const { data: nfts, isLoading } = useNFTs(nftCollection);
  // console.log(nfts);
  const address = useAddress();
  // Connect to our marketplace contract via the useMarketplace hook
  const marketplace = useMarketplace(
    MARKETPLACE_ID // Your marketplace contract address here
  );
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  !address && history.push("/");

  // Auction listing function
  const createAuctionListing = async () => {
    setLoading(true);
    try {
      await marketplace?.auction.createListing({
        assetContractAddress: COLLECTION_ID, // Contract Address of the NFT
        buyoutPricePerToken: data.price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: data.quantity, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: nftID, // Token ID of the NFT.
      });
      toast.dismiss();
      setLoading(false);
      toast.success("Listing created");
      history.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Direct listing function
  const createDirectListing = async () => {
    setLoading(true);
    try {
      await marketplace?.direct.createListing({
        assetContractAddress: COLLECTION_ID, // Contract Address of the NFT
        buyoutPricePerToken: data.price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: data.quantity, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: nftID, // Token ID of the NFT.
      });
      toast.dismiss();
      setLoading(false);
      toast.success("Listing created");
      setTimeout(() => {
        history.push("/");
      }, 500);
    } catch (error) {
      setLoading(false);
      toast.dismiss();

      toast.error("Error occurred!");
    }
  };

  loading && toast.loading("Loading......");

  // List nft function

  async function handleCreateListing() {
    if (!data.price || !data.quantity || !nftID) {
      toast.error("Please fill all fields");
    } else {
      try {
        // Ensure user is on the correct network
        if (networkMismatch) {
          switchNetwork && switchNetwork(ChainId.Mumbai);
          console.log("wrong network");
        }

        // Store the result of either the direct listing creation or the auction listing creation
        let transactionResult: undefined | any;

        // Depending on the type of listing selected, call the appropriate function
        // For Direct Listings:
        if (listing === "directlisting") {
          transactionResult = await createDirectListing();
          console.log(transactionResult);
        }

        // For Auction Listings:
        if (listing === "auctionlisting") {
          transactionResult = await createAuctionListing();
        }

        // If the transaction succeeds, take the user back to the homepage to view their listing!
        if (transactionResult) {
          //  router.push(`/`);
          console.log("success");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Create Item || NFT React Template</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              List your music to 9jaPlay
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
              <Label>Choose collection</Label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose an exiting collection or create a new one
              </div>
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                  {!isLoading ? (
                    nfts?.map(
                      (nft: any, index) =>
                        nft.owner === address && (
                          <RadioGroup.Option
                            key={index}
                            value={nft}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                  : ""
                              }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                            }
                            onClick={() => setNftID(nft.metadata.id._hex)}
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <div className="flex items-center justify-between">
                                        <RadioGroup.Description
                                          as="div"
                                          className={"rounded-full w-16"}
                                        >
                                          <NcImage
                                            containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                            src={nft.metadata.image}
                                          />
                                        </RadioGroup.Description>
                                        {checked && (
                                          <div className="flex-shrink-0 text-white">
                                            <CheckIcon className="w-6 h-6" />
                                          </div>
                                        )}
                                      </div>
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-semibold mt-3  ${
                                          checked ? "text-white" : ""
                                        }`}
                                      >
                                        {nft.metadata.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        )
                    )
                  ) : (
                    <p>Loading....</p>
                  )}
                </div>
              </RadioGroup>
            </div>
            {/* ---- */}
            <FormItem label="Price">
              <Input
                placeholder="List price"
                onChange={(e) => {
                  setData({ ...data, price: e.target.value });
                }}
              />
            </FormItem>

            {/* ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
              {/* ---- */}
              <FormItem label="Quantity">
                <Input
                  placeholder="1"
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
              </FormItem>
              {/* ---- */}
              {/* <FormItem label="Music Type">
                <Input placeholder="Blues" />
              </FormItem> */}
              {/* ---- */}
              {/* <FormItem label="Propertie">
                <Input placeholder="Propertie" />
              </FormItem> */}
            </div>

            {/* ---- */}
            <MySwitch
              enabled
              label={
                listing === "auctionlisting"
                  ? "Auction  Listing"
                  : "Direct Listing"
              }
              desc="Your music will be listed directly on 9jaPlay"
              toggle={() => {
                listing === "auctionlisting"
                  ? setListing("directlisting")
                  : setListing("auctionlisting");
              }}
            />

            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              {!loading ? (
                <ButtonPrimary className="flex-1" onClick={handleCreateListing}>
                  List NFT
                </ButtonPrimary>
              ) : (
                <ButtonPrimary className="flex-1" disabled>
                  List NFT
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ListNFT;
