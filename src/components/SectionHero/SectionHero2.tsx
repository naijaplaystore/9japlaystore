import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeroCard from "components/Cards/HeroCard";
import { useAddress } from "@thirdweb-dev/react";
import { useHistory } from "react-router-dom";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  const address = useAddress();
  const history = useHistory();
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-0  xl:pb-0 xl:pr-14 lg:mr-10 xl:mr-0 ">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
            Buy, Sell make money with music 🎧
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Music lovers, Discover the most outstanding NFTs in music, Buy, sell
           
            and earn
          </span>
          <div className="space-x-4">
            <ButtonPrimary
              onClick={() => {
                history.push("/page-search");
              }}
            >
              Explore
            </ButtonPrimary>
            {!address ? (
              <button
                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-8  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                onClick={() => {
                  history.push("/connect-wallet");
                }}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-8  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                onClick={() => {
                  history.push("/page-upload-item");
                }}
              >
                Create your NFT
              </button>
            )}
          </div>
        </div>

        <div className="flex-grow ">
          {/* <img className="w-full" src={imagePng} alt="hero" /> */}

          <HeroCard />
        </div>
      </div>

      {/* <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <HeroSearchForm />
      </div> */}
    </div>
  );
};

export default SectionHero2;
