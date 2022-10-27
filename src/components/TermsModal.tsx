import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";

export interface TermsModalProps {
  show: boolean;
  onCloseTermsModal: () => void;
}

const TermsModal: FC<TermsModalProps> = ({ show, onCloseTermsModal }) => {
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          TERMS OF SERVICE
        </h3>
        <span className="text-sm">
          NaijaPlayStore is a Nigerian music streaming service, registered under
          the corporate affairs commission (CAC) of Nigeria. Before using the
          services, carefully read the terms. You accept the terms by using the
          services in any manner. If you do not agree to the Terms, do not use
          the services.
        </span>
        <br />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Do's and Don'ts
        </h3>
        <span>
          Only NFT music or audio can be sold on NaijaPlayStore, any user caught
          minting (uploading) or auctioning NFT music or audio that belongs to
          an artist, music producer or creator will be sued for "breech of
          intellectual property."
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          <ButtonSecondary type="button" onClick={onCloseTermsModal}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
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
