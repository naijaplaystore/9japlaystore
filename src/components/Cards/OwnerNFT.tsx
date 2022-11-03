import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts } from "contains/fakeData";
import LikeButton from "../LikeButton";
import Prices from "../Prices";
import musicWave from "images/musicWave.png";
// import AudioForNft from "../AudioForNft";
import RemainingTimeNftCard from "../RemainingTimeNftCard";
import {
  useActiveListings,
  useMarketplace,
  useNFTCollection,
  useContract,
  useNFTs,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ID, COLLECTION_ID } from "key";

import AudioPlayer from "../AudioPlayer";
import { AudioPlayerProvider } from "react-use-audio-player";
import CardNFTMusic2 from "components/CardNFTMusic2";
import { CardSkeleton } from "./AllNFT";
export interface OwnerProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
  userAddress: string | undefined;
}

const OwnerNFT: FC<OwnerProps> = ({
  className = "",
  isLiked,
  featuredImage = nftsAbstracts[18],
  userAddress,
}) => {
  // Connect your marketplace smart contract here (replace this address)
  const address = useAddress();
  // const marketplace = useMarketplace(
  //   MARKETPLACE_ID // Your marketplace contract address here
  // );
  const { contract } = useContract(COLLECTION_ID, "nft-collection");
  const { contract: marketplace } = useContract(MARKETPLACE_ID, "marketplace");

  // const nftCollection = useNFTCollection(COLLECTION_ID);
  // const { data: nfts, isLoading } = useNFTs(nftCollection);
  // const { data: listings, isLoading: loadingListings } =
  //   useActiveListings(marketplace);

  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, userAddress);

  // const sold = listings?.filter((listing) => listing.sold);

  // console.log(ownedNFTs);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10 ">
      {isLoading ? (
        [1, 1, 1, 1].map((e) => <CardSkeleton />)
      ) : (
        <>
          {ownedNFTs === undefined && <p>No NFT</p>}
          {ownedNFTs?.map((nft) => (
            <div
              className={` relative group  ${className}`}
              data-nc-id="CardNFTMusic"
              key={nft.metadata.id}
            >
              {/* AUDIO MEDiA */}

              <div className="">
                <NcImage
                  containerClassName="block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
                  src={nft.metadata.image}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                />
              </div>

              {/* LIKE AND AVATARS */}
              {/* <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
                    <LikeButton className=" !h-9" nftId={nft.id} />
                  </div> */}

              {/* ----TIME--- */}
              <RemainingTimeNftCard />

              {/* MAIN CONTENT */}
              <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10">
                <div className={`px-5 flex items-center space-x-4 relative `}>
                  <div className={`flex-grow flex justify-center`}>
                    <img src={musicWave} alt="musicWave" />
                  </div>

                  <AudioPlayerProvider>
                    <AudioPlayer file={nft.metadata.audio} />
                  </AudioPlayerProvider>
                </div>

                <div
                  // to={"/nft-detailt"}
                  className="block p-5 mt-5 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
                >
                  <div className="flex items-center justify-between">
                    <h2 className={`text-sm font-semibold`}>
                      {nft.metadata.name} #{nft.metadata.id}
                    </h2>
                    <div className="flex -space-x-1.5 ">
                      <div>
                        <p className="text-xs  ">
                          <b>Owner:</b>{" "}
                          {nft.owner.slice(0, 3) + "..." + nft.owner.slice(-3)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="w-full mt-1.5 flex justify-between items-end ">
                        <Prices
                          labelText="Price"
                          labelTextClassName="bg-white dark:bg-neutral-800 "
                          price={`${listing.buyoutCurrencyValuePerToken.displayValue} ${listing.buyoutCurrencyValuePerToken.symbol}`}
                        />
                      </div> */}
                </div>
              </div>

              {/* <Link
                to={`/nft-detailt/${nft.metadata.id.toNumber()}`}
                className="absolute inset-0 "
              ></Link> */}
            </div>
          ))}
        </>
      )}
      {ownedNFTs?.length === 0 && <p>No nft</p>}
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

export default OwnerNFT;
