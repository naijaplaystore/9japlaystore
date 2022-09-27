import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import LikeButton from "../LikeButton";
import musicWave from "images/musicWave.png";
import { nanoid } from "@reduxjs/toolkit";
import AudioForNft from "../AudioForNft";
import RemainingTimeNftCard from "../RemainingTimeNftCard";
import AudioPlayer from "../AudioPlayer";
import { AudioPlayerProvider } from "react-use-audio-player";

export interface DetailCardProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
  image?: any;
  audio?: any;
  nftId?: any;
}

const DetailCard: FC<DetailCardProps> = ({
  className = "",
  isLiked,
  image,
  audio,
  nftId,
}) => {
  const [DEMO_NFT_ID] = React.useState(nanoid());

  return (
    <div
      className={`nc-CardNFTMusic relative group  ${className} mb-20`}
      data-nc-id="CardNFTMusic"
    >
      {/* AUDIO MEDiA */}
      <AudioForNft nftId={DEMO_NFT_ID} />

      <div className="">
        <NcImage
          containerClassName="block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
          src={image}
          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* LIKE AND AVATARS */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
        <LikeButton className=" !h-9" nftId={nftId} />
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
            <AudioPlayer file={audio} />
          </AudioPlayerProvider>
        </div>
      </div>

      {/* <Link to={"/nft-detailt"} className="absolute inset-0 "></Link> */}
    </div>
  );
};

export default DetailCard;
