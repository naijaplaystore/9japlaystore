import { ComponentType } from "react";

export interface LocationStates
{
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  //
  "/nft-detailt/:tokenId"?: {};
  "/nft-detailt"?: {};
  "/page-collection"?: {};
  "/page-search"?: {};
  "/page-author"?: {};
  "/page-author/:userAddress"?: {};
  "/page-upload-item"?: {};
  "/home-header-2"?: {};
  "/connect-wallet"?: {};
  //
  "/account"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};

  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/list-NFT"?: {};

}

export type PathName = keyof LocationStates;

export interface Page
{
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
