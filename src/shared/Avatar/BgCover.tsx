import { avatarColors } from "contains/contants";
import React, { FC, useContext } from "react";

import { avatarImgs } from "contains/fakeData";
import VerifyIcon from "components/VerifyIcon";

import UserContext from "context/UserContext";
import { useAddress } from "@thirdweb-dev/react";
import PlaceIcon from "shared/NcImage/PlaceIcon";

export interface BgCoverProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
  urlProfile?: string;
}

const BgCover: FC<BgCoverProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
  hasChecked,
  hasCheckedClass = "w-4 h-4 bottom-1 -right-0.5",
  urlProfile,
}) => {
  const { user }: any = useContext(UserContext);
  const address = useAddress();
  const url = urlProfile || imgUrl;
  const name = userName || "John Doe";

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {/* {url && address === user.address_id && (
        <img
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
        />
      )} */}

      {url && address === user.address_id ? (
        <img
          className={`absolute inset-0 w-full h-full object-cover `}
          src={url}
          alt={name}
        />
      ) : (
        // <span className="wil-avatar__name">{name[0]}</span>
        renderLoadingPlaceholder()
      )}

      {hasChecked && (
        <span className={`  text-white  absolute  ${hasCheckedClass}`}>
          <VerifyIcon className="" />
        </span>
      )}
    </div>
  );
};

export default BgCover;
