import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "images/socials/facebook.svg";
import twitter from "images/socials/twitter.svg";
import telegram from "images/socials/telegram.svg";
import youtube from "images/socials/youtube.svg";
import { Link } from "react-router-dom";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  href?: any;
  name?: string;
  icon?: string;
}

const SocialsList2: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  href,
  name,
  icon,
}) => {
  //   console.log(href);
  return (
    <a
      className={`${itemClass}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
    >
      <img src={icon} alt="" />
    </a>
  );
};

export default SocialsList2;
