import type { ModalContentProps } from "./WalletModal.types";

import { Image, MessageBox, WalletState } from "@/embedded/ui";
import React from "react";

import {
  LogoContainer,
  Spinner,
  WalletImageContainer,
} from "./WalletModalContent.styles";

export function ModalContent(props: ModalContentProps) {
  const { state, image, error } = props;
  if (state === WalletState.CONNECTED) {
    return (
      <MessageBox
        type="success"
        title={"Wallet Connected"}
        description={"Your wallet is connected, you can use it to swap."}
      />
    );
  }

  if (error) {
    return (
      <MessageBox
        type="error"
        title={"Failed to Connect"}
        description={error || "Your wallet is not connected. Please try again."}
      />
    );
  }

  return (
    <MessageBox
      type="loading"
      title={"Connecting to your wallet"}
      description={"Click connect in your wallet popup."}
      icon={
        <LogoContainer>
          <WalletImageContainer>
            <Image src={image} size={45} />
          </WalletImageContainer>
          <Spinner />
        </LogoContainer>
      }
    />
  );
}
