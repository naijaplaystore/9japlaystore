import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts } from "contains/fakeData";
import LikeButton from "../LikeButton";
import Prices from "../Prices";
import musicWave from "images/musicWave.png";
// import AudioForNft from "../AudioForNft";
import RemainingTimeNftCard from "../RemainingTimeNftCard";
import { useActiveListings, useContract } from "@thirdweb-dev/react";
import { MARKETPLACE_ID } from "key";

import AudioPlayer from "../AudioPlayer";
import { AudioPlayerProvider } from "react-use-audio-player";
import CardNFTMusic2 from "components/CardNFTMusic2";
import { CardSkeleton } from "./AllNFT";
export interface ActiveListProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
}

const ActiveList: FC<ActiveListProps> = ({
  className = "",
  isLiked,
  featuredImage = nftsAbstracts[18],
}) => {
  // Connect your marketplace smart contract here (replace this address)
  // const marketplace = useMarketplace(
  //   MARKETPLACE_ID // Your marketplace contract address here
  // );
  const { contract: marketplace } = useContract(MARKETPLACE_ID, "marketplace");

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  console.log(listings);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10 ">
      {loadingListings ? (
        [1, 2, 3, 4, 1, 2, 3, 4].map((d) => <CardSkeleton />)
      ) : (
        <>
          {listings?.slice(0, 8).map((listing) => (
            <div
              className={` relative group  ${className}`}
              data-nc-id="CardNFTMusic"
              key={listing.id}
            >
              {/* AUDIO MEDiA */}

              <div className="">
                <NcImage
                  containerClassName="block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
                  src={listing.asset.image}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                />
              </div>

              {/* LIKE AND AVATARS */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
                <LikeButton className=" !h-9" nftId={listing.id} />
              </div>

              {/* ----TIME--- */}
              <RemainingTimeNftCard />

              {/* MAIN CONTENT */}
              <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10">
                <div className={`px-5 flex items-center space-x-4 relative `}>
                  <div className={`flex-grow flex justify-center`}>
                    <img src={musicWave} alt="musicWave" />
                  </div>

                  <AudioPlayerProvider>
                    <AudioPlayer file={listing?.asset.audio} />
                  </AudioPlayerProvider>
                </div>

                <div
                  // to={"/nft-detailt"}
                  className="block p-5 mt-5 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
                >
                  <div className="flex items-center justify-between">
                    <h2 className={`text-sm font-semibold`}>
                      {listing.asset.name} #{listing.id}
                    </h2>
                    <div className="flex -space-x-1.5 ">
                      <div>
                        <p className="text-xs  ">
                          <b>Owner:</b>{" "}
                          {listing.sellerAddress.slice(0, 3) +
                            "..." +
                            listing.sellerAddress.slice(-3)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-1.5 flex justify-between items-end ">
                    <Prices
                      labelText="Price"
                      labelTextClassName="bg-white dark:bg-neutral-800 "
                      price={`${listing.buyoutCurrencyValuePerToken.displayValue} ${listing.buyoutCurrencyValuePerToken.symbol}`}
                    />
                  </div>
                </div>
              </div>

              <Link
                to={`/nft-detailt/${listing.id}`}
                className="absolute inset-0 "
              ></Link>
            </div>
          ))}
        </>
      )}
      {/* <div className="grid grid-rows-3 gap-6 xl:gap-8 sm:col-span-6 xl:col-span-2">
        {[nftsAbstracts[2], nftsAbstracts[4], nftsAbstracts[7]].map(
          (p, index) => (
            <CardNFTMusic2 featuredImage={p} key={index} />
          )
        )}
      </div> */}
    </div>
  );
};

export default ActiveList;
