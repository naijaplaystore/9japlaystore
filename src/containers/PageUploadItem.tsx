import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import MySwitch from "components/MySwitch";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { COLLECTION_ID } from "../key";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

import {
  useNetworkMismatch,
  useNetwork,
  useSigner,
  useAddress,
  ChainId,
} from "@thirdweb-dev/react";
const storage = new ThirdwebStorage();
export interface PageUploadItemProps {
  className?: string;
}

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  // dynamic routing
  const history = useHistory();
  // Thirdweb initiation
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress();

  // Initialize the Thirdweb SDK on the serverside
  const sdk = ThirdwebSDK.fromPrivateKey(
    // Your wallet private key (read it in from .env.local file)
    "aeeeb76e5199c2968c7baeb61052c09a3d39a6d1e0cd111693a57add6a20ae71",
    "mumbai"
  );

  // Load the NFT Collection via it's contract address using the SDK
  const nftCollection2 = sdk.getNFTCollection(
    // Replace this with your NFT Collection contract address
    COLLECTION_ID
  );

  const [data, setData] = useState({
    name: "",
    description: "",
  }) as any;
  const [fileUrl, setFileUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isloading, setIsLoading] = useState(false as boolean);
  const [listing, setListing] = useState<string>("listNFT");

  // file upload
  async function onChange(e: any) {
    setIsLoading(true);
    const file = e.target.files[0];
    const result = await storage.upload(file);
    const url = storage.resolveScheme(result);

    setFileUrl(url);
    toast.dismiss();

    toast.success("file uploaded sucessful!");
    setIsLoading(false);
  }

  isloading && toast.loading("loading....");

  // console.log(fileUrl);

  // file upload
  async function onAudioUpload(e: any) {
    setIsLoading(true);
    const file = e.target.files[0];
    const result = await storage.upload(file);
    const url = storage.resolveScheme(result);
    toast.dismiss();
    setAudioUrl(url);
    toast.success("audio uploaded sucessful!");
    setIsLoading(false);
  }

  const mintNftMusic = async () => {
    setIsLoading(true);
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
      return;
    }

    const signedPayload = await nftCollection2.signature.generate({
      to: address,
      metadata: {
        name: data.name,
        image: fileUrl,
        audio: audioUrl,
        description: data.description,
        properties: {
          // Add any properties you want to store on the NFT
        },
      },
    });
    await nftCollection2.signature.mint(signedPayload);

    try {
      toast.dismiss();
      toast.success("You sucessful mint your music !");
      setIsLoading(false);
      listing === "listNFT" ? history.push("/") : history.push("/listNFT");
    } catch (err) {
      console.log(err);
    }
  };

  const uploadNFT = () => {
    if (!data.name || !data.description || !fileUrl || !audioUrl) {
      toast.error("Please fill all the fields");
    } else {
      mintNftMusic();
    }
  };

  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Create Item || NFT React Template</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Create New Item
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            {/* ---- */}
            <FormItem label="Item Name">
              <Input
                defaultValue="NFT name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </FormItem>

            {/* External link */}
            {/* <FormItem
              label="External link"
              desc="Ciscrypt will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  https://
                </span>
                <Input className="!rounded-l-none" placeholder="abc.com" />
              </div>
            </FormItem> */}

            {/* External link */}
            <FormItem
              label="Description"
              desc={
                <div>
                  The description will be included on the item's detail page
                  underneath its image.{" "}
                  <span className="text-green-500">Markdown</span> syntax is
                  supported.
                </div>
              }
            >
              <Textarea
                rows={6}
                className="mt-1.5"
                placeholder="..."
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </FormItem>
            {/* -Image Upload--- */}

            <div>
              <h3 className="text-lg sm:text-2xl font-semibold">
                Image, Video, Audio, or 3D Model
              </h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/png, image/jpeg"
                          onChange={onChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio upload */}
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold">Audio</h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                File types supported: MP3 only
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Upload audio file</span>

                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                          className="sr-only"
                          accept="audio/mp3"
                          onChange={onAudioUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Audio up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {/* {audioUrl && (
                <img src={audioUrl} alt={audioUrl} className="rounded mt-4" />
              )} */}
            </div>
            <MySwitch
              enabled
              label={
                listing === "listNFT"
                  ? "List your music to nijaplaystore"
                  : "Mint your music and list later"
              }
              desc={
                listing === "listNft"
                  ? "Your music will be listed directly on 9jaPlay"
                  : ""
              }
              toggle={() => {
                listing === "listNFT"
                  ? setListing("mint")
                  : setListing("listNFT");
              }}
            />
            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              {isloading ? (
                <ButtonPrimary className="flex-1" onClick={uploadNFT} disabled>
                  Mint NFT
                </ButtonPrimary>
              ) : (
                <ButtonPrimary className="flex-1" onClick={uploadNFT}>
                  Mint NFT
                </ButtonPrimary>
              )}
              <ButtonSecondary className="flex-1">Preview NFT</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUploadItem;
