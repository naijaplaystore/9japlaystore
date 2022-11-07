import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";

export interface TermsModalProps {
  show: boolean;
  onCloseTermsModal: () => void;
}

const TermsData = [
  {
    heading: "  TERMS OF SERVICE",
    desc: ` NaijaPlayStore is a Nigerian music streaming service, registered under
          the corporate affairs commission (CAC) of Nigeria BN - 3610875. Before using the
          services, carefully read the terms. You accept the terms by using the
          services in any manner. If you do not agree to the Terms, do not use
          the services.`,
  },
  {
    heading: " Do's and Don'ts",
    desc: `   Only NFT music or audio can be sold on NaijaPlayStore, any user caught
          minting (uploading) or auctioning NFT music or audio that belongs to
          an artist, music producer or creator will be sued for "breech of
          intellectual property."`,
  },
  {
    heading: " Protection of Data",
    desc: `    We are concerned about the security of your information and take
          drastic, appropriate managerial, practical, and concrete precautions
          to protect and secure all information collected through our website.
          The security of our systems cannot, however, be completely guaranteed 
          because no security operation is inaccessible. If any information
          under our control is compromised due to a security breach, we shall
          act to take necessary steps to inquire into the event, inform any
          persons whose information may have been compromised as needed, and
          take additional action in accordance with any applicable laws and
          regulations.`,
  },
  {
    heading: "Third-Parties",
    desc: `For carrying out Crypto currency transactions, we employ
          the third-party electronic wallet extension MetaMask, Walletconnect,
          walletlink; your interactions with these extensions are controlled by
          the applicable privacy regulations.`,
  },
  {
    heading: "Data Access",
    desc: "On the account settings page, you may view your personal information.",
  },
  {
    heading: "Modify Data",
    desc: "Your account settings page has a section where you can edit your personal information.",
  },
  {
    heading: "Age Limit",
    desc: `Collection of personal data from visitors who are younger than 13 is highly prohibited.
If it comes to our notice that the data of a child under 13, is on our website we will make every effort to erase the data as soon as we can. Please do not hesitate to let us know if you observe any suspicious activity.`,
  },
];

const TermsModal: FC<TermsModalProps> = ({ show, onCloseTermsModal }) => {
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <div className="h-72 overflow-y-scroll">
        {TermsData.map((data, i) => (
          <>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              {data.heading}
            </h3>
            <span className="text-sm">{data.desc}</span>
          </>
        ))}
        <span>
          For questions, answers, inquires, complaints, reports please contact
          us through our information on the website
        </span>

        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          <ButtonSecondary type="button" onClick={onCloseTermsModal}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseTermsModal}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default TermsModal;
