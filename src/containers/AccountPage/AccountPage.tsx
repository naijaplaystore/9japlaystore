import Label from "components/Label/Label";
import React, { FC, useState, useContext } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import useCopyToClipboard from "../../useHooks/useCopyToClipboard";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { profile } from "console";
import toast from "react-hot-toast";
import SuccessMark from "shared/SuccessMark/SuccessMark";
import UserContext from "context/UserContext";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import BgCover from "shared/Avatar/BgCover";
import { useHistory } from "react-router";

export interface AccountPageProps {
  className?: string;
}

export interface ProfileType {
  address_id?: string;
  profile_image?: null | any;
  profile_header_image?: null | any;
  username?: string;
  email?: null | string;
  bio?: null | string;
  website_link?: null | string;
  twitter?: null | string;
  instagram?: null | string;
  verifield?: boolean;
  id?: number;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const history = useHistory();
  // thirdweb init
  const address = useAddress() as string;
  const { user }: any = useContext(UserContext);
  // console.log(user);
  // Hooks init
  const [value, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(true);
  const [profileUrl, setProfileUrl] = useState<any>(null);
  const [bgUrl, setBgUrl] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const storage = new ThirdwebStorage();

  const [profileData, setProfileData] = useState<ProfileType>({
    bio: null,
    username: "Untitled",
    email: null,
    website_link: null,
    twitter: null,
    instagram: null,
  });
  // const sdk = ThirdwebSDK.fromPrivateKey(
  //   // Your wallet private key (read it in from .env.local file)
  //   "aeeeb76e5199c2968c7baeb61052c09a3d39a6d1e0cd111693a57add6a20ae71",
  //   "mumbai"
  // );

  // Fuction to copy address to clipbboard
  const copyAddress = () => {
    copy(address);

    setTimeout(() => {
      setIsCopied(true);
    }, 3000);
    setIsCopied(false);
  };

  // Function to get data

  // Function to handle input change
  const url: string = `https://naijaplaystore.pythonanywhere.com/update/${user.id}/`;
  const updateProfile = () => {
    const data = {
      profile_image: profileUrl || user.profile_image,
      id: user.id,
      address_id: user.address_id,
      bio: profileData.bio || user.bio,
      username: profileData.username || user.username,
      email: profileData.email || user.email,
      website_link: profileData.website_link || user.website_link,
      twitter: profileData.twitter || user.twitter,
      instagram: profileData.instagram || user.instagram,
      profile_header_image: bgUrl || user.profile_header_image,
    };
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setLoading(true);
    axios
      .put(url, data)
      .then((res) => {
        console.log(res);
        // toast.dismiss();
        toast.success("Your Profile is uploaded sucessful");
        history.push("/");
        setLoading(false);
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // loading && toast.loading("Loading.......");

  // console.log(profileUrl);
  // Profile image upload
  const onProfileUpload = async (e: any) => {
    const file = e.target.files[0];
    const result = await storage.upload(file);
    const url = storage.resolveScheme(result);

    setProfileUrl(url);

    toast.success("file uploaded sucessful!");
  };

  // Upload onBgCoverUpload
  const onBgCoverUpload = async (e: any) => {
    const file = e.target.files[0];
    const result = await storage.upload(file);
    const url = storage.resolveScheme(result);

    setBgUrl(url);
    toast.success("file uploaded sucessful!");
  };
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || NaijaPlaystore</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Profile settings
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar
                  sizeClass="w-32 h-32"
                  imgUrl={user.profile_image}
                  urlProfile={profileUrl}
                  userName={user.username}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onProfileUpload}
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">
              {/* ---- */}
              <div className="flex-shrink-0 flex items-start">
                <div className="relative w-full rounded-lg overflow-hidden flex">
                  <BgCover
                    sizeClass="w-full h-32"
                    imgUrl={user.profile_header_image}
                    urlProfile={bgUrl}
                    userName={user.username}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mt-1 text-xs">
                      Change Background Cover
                    </span>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onBgCoverUpload}
                  />
                </div>
              </div>
              <div>
                <Label>Username</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Fullname"
                  defaultValue={user.username}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      username: e.target.value,
                    });
                  }}
                />
              </div>

              {/* ---- */}
              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder="example@email.com"
                    defaultValue={user.email}
                    onChange={(e) => {
                      setProfileData({ ...profileData, email: e.target.value });
                    }}
                  />
                </div>
              </div>

              {/* ---- */}
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={5}
                  className="mt-1.5"
                  placeholder="Something about yourself in a few word."
                  defaultValue={user.bio}
                  onChange={(e) => {
                    setProfileData({ ...profileData, bio: e.target.value });
                  }}
                />
              </div>

              {/* ---- */}
              <div className="">
                <Label>Website</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    https://
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder="yourwebsite.com"
                    value={user.website_link}
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        website_link: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              {/* ---- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                {/* <div>
                  <Label>Facebook</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-facebook-f"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="yourfacebook"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          facebookURL: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div> */}
                <div>
                  <Label>Twitter</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-twitter"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="yourtwitter"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                      defaultValue={user.twitter}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          twitter: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Instagram</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-telegram-plane"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="Instagram"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                      defaultValue={user.instagram}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          instagram: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ---- */}
              <div>
                <Label>Wallet Address</Label>
                <div className="mt-1.5 relative text-neutral-700 dark:text-neutral-300 flex">
                  <Input className="!pr-10 " disabled defaultValue={address} />

                  {!isCopied ? (
                    <>
                      <SuccessMark />
                    </>
                  ) : (
                    <button
                      className="absolute inset-y-2 right-1"
                      onClick={copyAddress}
                    >
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* ---- */}
              <div className="pt-2">
                <ButtonPrimary className="w-full" onClick={updateProfile}>
                  Update profile
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
