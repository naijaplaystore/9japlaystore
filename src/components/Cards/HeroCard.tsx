import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts } from "contains/fakeData";
import LikeButton from "../LikeButton";
import musicWave from "images/musicWave.png";
import AudioPlayer from "../AudioPlayer";
import RemainingTimeNftCard from "../RemainingTimeNftCard";
import { useActiveListings, useMarketplace } from "@thirdweb-dev/react";
import { MARKETPLACE_ID } from "key";

import { AudioPlayerProvider } from "react-use-audio-player";

export interface HeroCardProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
}

const HeroCard: FC<HeroCardProps> = ({
  className = "",
  isLiked,
  featuredImage = nftsAbstracts[18],
}) => {
  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    MARKETPLACE_ID // Your marketplace contract address here
  );

  const { data: listings } = useActiveListings(marketplace);

  const musicMeta: any = [];
  listings?.map((listing) => {
    musicMeta.push(listing.asset);
  });
  let rand = [musicMeta[Math.floor(Math.random() * musicMeta.length)]];

  return (
    <div>
      {/* {Array.from("11111111").map((_, index) => (
        <CardNFT key={index} />
      ))} */}

      {rand[0] === undefined ? (
        <div>loading...</div>
      ) : (
        rand?.map((listing: any) => (
          <div
            className={`nc-CardNFTMusic relative group  ${className}`}
            data-nc-id="CardNFTMusic"
            key={listing.id}
          >
            {/* AUDIO MEDiA */}

            <div className="">
              <NcImage
                containerClassName="block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
                src={listing.image}
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* LIKE AND AVATARS */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
              <LikeButton liked={isLiked} className=" !h-9" />
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
                  <AudioPlayer file={listing.audio} />
                </AudioPlayerProvider>
              </div>

              <div
                // to={"/nft-detailt"}
                className="block p-5 mt-5 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
              >
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-semibold`}>
                    {listing.name} #{listing.id.toNumber()}
                  </h2>
                  <div className="flex -space-x-1.5 ">
                    {/* <button
                    className="bg-primary-6000 px-3 py-1 rounded-lg text-sm tracking-widest bg-opacity-40"
                    onClick={() => buyNFT("nft")}
                  >
                    BUY
                  </button> */}
                  </div>
                </div>

                {/* <div className="w-full mt-1.5 flex justify-between items-end ">
                  <Prices
                    labelText="Price"
                    labelTextClassName="bg-white dark:bg-neutral-800 "
                    price={"nft"}
                  />
                  <span className="block text-neutral-500 dark:text-neutral-400 text-xs">
                    Featured
                  </span>
                </div> */}
              </div>
            </div>

            <Link
              to={`/nft-detailt/${listing.id.toNumber()}`}
              className="absolute inset-0 "
            ></Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HeroCard;
