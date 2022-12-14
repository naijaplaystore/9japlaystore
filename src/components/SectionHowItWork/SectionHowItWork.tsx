import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/HIW1img.png";
import HIW2img from "images/9japlay/connect.png";
import HIW3img from "images/9japlay/buy&sell.png";
import HIW4img from "images/9japlay/earn.png";
import VectorImg from "images/VectorHIW.svg";
import Badge from "shared/Badge/Badge";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW2img,
    imgDark: HIW2img,
    title: "Connect wallet",
    desc: "Connect with wallet, ",
  },
  {
    id: 2,
    img: HIW3img,
    imgDark: HIW3img,
    title: "Start trading",
    desc: "discover, buy NTFs, ",
  },
  {
    id: 3,
    img: HIW4img,
    imgDark: HIW4img,
    title: "Earn money",
    desc: "sell your NFTs and earn money",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading
        desc={"Steps to earn money"}
        className="mb-14 text-neutral-900 dark:text-neutral-50"
      >
        How it works
      </Heading>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 -top-1"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              src={item.img}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "green"
                    : index === 1
                    ? "pink"
                    : index === 2
                    ? "yellow"
                    : "green"
                }
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
