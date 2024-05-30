import type { ModalNetworkValueTypes } from "./SwapDetailsModal.types";

import { PendingSwapNetworkStatus } from "rango-types";

export const modalNetworkValues: Record<
  Exclude<PendingSwapNetworkStatus, PendingSwapNetworkStatus.WaitingForQueue>,
  ModalNetworkValueTypes
> = {
  [PendingSwapNetworkStatus.WaitingForNetworkChange]: {
    type: "loading",
    title: "Change Network",
  },
  [PendingSwapNetworkStatus.WaitingForConnectingWallet]: {
    type: "warning",
    title: "Connect Wallet",
  },
  [PendingSwapNetworkStatus.NetworkChanged]: {
    type: "success",
    title: "Network Changed",
  },
};
