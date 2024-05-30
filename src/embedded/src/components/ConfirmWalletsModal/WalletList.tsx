import type { PropTypes } from "./WalletList.type";
import type { Wallet, WalletInfoWithNamespaces } from "../../types";
import type { Namespace, WalletType } from "@rango-dev/wallets-shared";

import {
  Button,
  Divider,
  Image,
  MessageBox,
  SelectableWallet,
  Typography,
  WalletState,
} from "@/embedded/ui";
import React, { useEffect, useState } from "react";

import { useWallets } from "../..";
import { WIDGET_UI_ID } from "../../constants";
import { useWalletList } from "../../hooks/useWalletList";
import {
  TIME_TO_CLOSE_MODAL,
  TIME_TO_IGNORE_MODAL,
} from "../../page/WalletsPage";
import { useAppStore } from "../../store/AppStore";
import { useUiStore } from "../../store/ui";
import { useWalletsStore } from "../../store/wallets";
import { getBlockchainDisplayNameFor } from "../../utils/meta";
import {
  getAddress,
  getConciseAddress,
  isExperimentalChain,
} from "../../utils/wallets";
import { WatermarkedModal } from "../common/WatermarkedModal";
import { WalletModal } from "../WalletModal";
import { WalletNamespacesModal } from "../WalletNamespacesModal";

import { ShowMoreWallets } from "./ConfirmWallets.styles";
import {
  LogoContainer,
  Spinner,
  WalletImageContainer,
} from "./WalletList.styles";

interface WalletNamespacesModalState {
  providerType: string;
  providerImage: string;
  availableNamespaces?: Namespace[];
  singleNamespace?: boolean;
}

const ACCOUNT_ADDRESS_MAX_CHARACTERS = 7;
export function WalletList(props: PropTypes) {
  const { chain, isSelected, selectWallet, limit, onShowMore } = props;
  const isActiveTab = useUiStore.use.isActiveTab();

  const connectedWallets = useWalletsStore.use.connectedWallets();
  const { blockchains } = useAppStore();
  const [openWalletStateModal, setOpenWalletStateModal] =
    useState<WalletType>("");
  const [experimentalChainWallet, setExperimentalChainWallet] =
    useState<Wallet | null>(null);
  const [showExperimentalChainModal, setShowExperimentalChainModal] =
    useState(false);
  const [addingExperimentalChainStatus, setAddingExperimentalChainStatus] =
    useState<"in-progress" | "completed" | "rejected" | null>(null);
  const [namespacesModalState, setNamespacesModalState] =
    useState<WalletNamespacesModalState | null>(null);
  const { suggestAndConnect } = useWallets();
  let modalTimerId: ReturnType<typeof setTimeout> | null = null;
  const {
    list,
    error,
    handleClick,
    disconnectWallet,
    disconnectConnectingWallets,
  } = useWalletList({
    chain,
    onBeforeConnect: (type) => {
      modalTimerId = setTimeout(() => {
        setOpenWalletStateModal(type);
      }, TIME_TO_IGNORE_MODAL);
    },
    onConnect: () => {
      if (modalTimerId) {
        clearTimeout(modalTimerId);
      }
      setTimeout(() => {
        setOpenWalletStateModal("");
      }, TIME_TO_CLOSE_MODAL);
    },
  });
  const [sortedList, setSortedList] =
    useState<WalletInfoWithNamespaces[]>(list);
  const numberOfSupportedWallets = list.length;
  const shouldShowMoreWallets = limit && numberOfSupportedWallets - limit > 0;

  const addExperimentalChain = async (wallet: Wallet) => {
    setShowExperimentalChainModal(false);
    setAddingExperimentalChainStatus("in-progress");
    try {
      await suggestAndConnect(wallet.walletType, wallet.chain);
      setAddingExperimentalChainStatus("completed");
    } catch (e) {
      setAddingExperimentalChainStatus("rejected");
    }
  };

  const handleOpenNamespacesModal = (wallet: WalletInfoWithNamespaces) => {
    setNamespacesModalState({
      providerType: wallet.type,
      providerImage: wallet.image,
      availableNamespaces: wallet.namespaces,
      singleNamespace: wallet.singleNamespace,
    });
  };

  useEffect(() => {
    setSortedList((sortedList) => {
      const selectedWalletIndex = list.findIndex((wallet) =>
        isSelected(wallet.type, chain),
      );

      if (shouldShowMoreWallets && selectedWalletIndex > 1) {
        return [list[selectedWalletIndex]].concat(
          list.filter((_, index) => index !== selectedWalletIndex),
        );
      }
      return sortedList.map(
        (sortedItem) =>
          list.find((listItem) => listItem.type === sortedItem.type) ??
          sortedItem,
      );
    });
  }, [JSON.stringify(list)]);

  const modalContainer = document.getElementById(
    WIDGET_UI_ID.SWAP_BOX_ID,
  ) as HTMLDivElement;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (
      addingExperimentalChainStatus === "completed" ||
      addingExperimentalChainStatus === "rejected"
    ) {
      timeout = setTimeout(
        () => setAddingExperimentalChainStatus(null),
        TIME_TO_CLOSE_MODAL,
      );
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [addingExperimentalChainStatus]);

  const handleCloseWalletModal = () => {
    disconnectConnectingWallets();
    setOpenWalletStateModal("");
  };

  return (
    <>
      {sortedList.slice(0, limit).map((wallet) => {
        const address = getAddress({
          connectedWallets,
          walletType: wallet.type,
          chain,
        });
        const conciseAddress = address
          ? getConciseAddress(address, ACCOUNT_ADDRESS_MAX_CHARACTERS)
          : "";

        const experimentalChain = isExperimentalChain(blockchains(), chain);

        const experimentalChainNotAdded = !connectedWallets.find(
          (connectedWallet) =>
            connectedWallet.walletType === wallet.type &&
            connectedWallet.chain === chain,
        );

        const couldAddExperimentalChain =
          experimentalChain &&
          experimentalChainNotAdded &&
          wallet.state === WalletState.CONNECTED;

        const connectedWalletDescription = couldAddExperimentalChain
          ? `Add ${chain} chain`
          : conciseAddress;

        const onClick = async () => {
          if (wallet.state === WalletState.DISCONNECTED) {
            if (wallet.namespaces) {
              handleOpenNamespacesModal(wallet);
            } else {
              void handleClick(wallet.type);
            }
          } else if (!!wallet.namespaces && !conciseAddress) {
            await disconnectWallet(wallet.type);
            handleOpenNamespacesModal(wallet);
          } else if (couldAddExperimentalChain) {
            setExperimentalChainWallet({
              walletType: wallet.type,
              chain,
              address: address ?? "",
            });
            setShowExperimentalChainModal(true);
          } else {
            selectWallet({
              walletType: wallet.type,
              chain,
              address: address ?? "",
            });
          }
        };

        const blockchainDisplayName: string | undefined =
          experimentalChainWallet?.chain
            ? getBlockchainDisplayNameFor(
                experimentalChainWallet.chain,
                blockchains(),
              )
            : undefined;
        return (
          <React.Fragment key={`${wallet.title}_${blockchainDisplayName}`}>
            <WalletModal
              open={openWalletStateModal === wallet.type}
              onClose={handleCloseWalletModal}
              image={wallet.image}
              state={wallet.state}
              error={error}
            />
            <WalletNamespacesModal
              open={!!namespacesModalState}
              onClose={() => setNamespacesModalState(null)}
              onConfirm={(namespaces) => {
                void handleClick(
                  namespacesModalState?.providerType as string,
                  namespaces,
                );
                setNamespacesModalState(null);
              }}
              image={namespacesModalState?.providerImage}
              namespaces={namespacesModalState?.availableNamespaces}
              singleNamespace={namespacesModalState?.singleNamespace}
            />
            {!!experimentalChainWallet && (
              <WatermarkedModal
                open={!!experimentalChainWallet && showExperimentalChainModal}
                container={modalContainer}
                onClose={() => {
                  setExperimentalChainWallet(null);
                }}
              >
                <MessageBox
                  title={`Add ${blockchainDisplayName} Chain`}
                  type="warning"
                  description={`You should connect a ${blockchainDisplayName} supported wallet or choose a different ${blockchainDisplayName} address`}
                >
                  <Divider size={18} />
                  <Divider size={32} />
                  <Button
                    onClick={addExperimentalChain.bind(
                      null,
                      experimentalChainWallet,
                    )}
                    variant="outlined"
                    type="primary"
                    fullWidth
                    size="large"
                  >
                    {"Confirm"}
                  </Button>
                </MessageBox>
              </WatermarkedModal>
            )}
            {addingExperimentalChainStatus && (
              <WatermarkedModal
                open={!!addingExperimentalChainStatus}
                onClose={setAddingExperimentalChainStatus.bind(null, null)}
                container={modalContainer}
              >
                {addingExperimentalChainStatus === "in-progress" && (
                  <MessageBox
                    type="loading"
                    title={`Add ${blockchainDisplayName} Chain`}
                    description={`You should connect a ${blockchainDisplayName} supported wallet or choose a different ${blockchainDisplayName} address`}
                    icon={
                      <LogoContainer>
                        <WalletImageContainer>
                          <Image src={wallet.image} size={45} />
                        </WalletImageContainer>
                        <Spinner />
                      </LogoContainer>
                    }
                  />
                )}

                {addingExperimentalChainStatus === "completed" && (
                  <MessageBox
                    type="success"
                    title={`${blockchainDisplayName} Chain Added`}
                    description={`${blockchainDisplayName} is added to your wallet, you can use it to swap.`}
                  />
                )}

                {addingExperimentalChainStatus === "rejected" && (
                  <MessageBox
                    type="error"
                    title={"Request Rejected"}
                    description={`You've rejected adding ${blockchainDisplayName} chain to your wallet.`}
                  />
                )}

                <Divider direction="vertical" size={32} />
              </WatermarkedModal>
            )}
            <SelectableWallet
              key={wallet.type}
              description={connectedWalletDescription}
              onClick={onClick}
              selected={isSelected(wallet.type, chain)}
              disabled={!isActiveTab}
              {...wallet}
            />
          </React.Fragment>
        );
      })}
      {shouldShowMoreWallets && (
        <ShowMoreWallets selected={false} onClick={onShowMore}>
          <Typography
            variant="label"
            size="medium"
            className={undefined}
            color={undefined}
          >
            {"Show more wallets"}
            <Typography
              variant="label"
              size="medium"
              color="$primary"
              className={undefined}
            >
              &nbsp;+{numberOfSupportedWallets - (limit ?? 0)}
            </Typography>
          </Typography>
        </ShowMoreWallets>
      )}
    </>
  );
}
