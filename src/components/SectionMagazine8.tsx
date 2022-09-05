import Heading from "components/Heading/Heading";
import { nftsAbstracts } from "contains/fakeData";
import React, { FC } from "react";
import CardNFTMusic from "./CardNFTMusic";
import CardNFTMusic2 from "./CardNFTMusic2";
import ActiveList from "./Cards/ActiveList";

export interface SectionMagazine8Props {
  className?: string;
}

const SectionMagazine8: FC<SectionMagazine8Props> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionMagazine8 relative ${className}`}>
      <Heading
        desc={"Click on music icon and enjoy NTF music or audio "}
        className="mb-14 text-neutral-900 dark:text-neutral-50"
      >
        Listen NFTs audio live
      </Heading>

      <ActiveList />
    </div>
  );
};

export default SectionMagazine8;
