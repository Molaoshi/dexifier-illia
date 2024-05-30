import type { WaningAlertsProps } from "./SwapDetailsAlerts.types";

import { Alert, Button } from "@/embedded/ui";
import { PendingSwapNetworkStatus } from "rango-types";
import React from "react";

export function WarningAlert(props: WaningAlertsProps) {
  const { switchNetwork, setNetworkModal, message, showNetworkModal } = props;
  if (switchNetwork) {
    return (
      <Alert
        type="warning"
        title={message.shortMessage}
        action={
          <Button
            size="xxsmall"
            type="warning"
            onClick={() => {
              setNetworkModal(PendingSwapNetworkStatus.WaitingForNetworkChange);
              switchNetwork().catch((e) => {
                console.log(e);
              });
            }}
          >
            {"Change"}
          </Button>
        }
      />
    );
  }
  if (
    showNetworkModal === PendingSwapNetworkStatus.WaitingForConnectingWallet
  ) {
    return (
      <Alert
        type="warning"
        title={message.shortMessage}
        action={
          <Button
            size="xxsmall"
            type="warning"
            onClick={() => {
              setNetworkModal(
                PendingSwapNetworkStatus.WaitingForConnectingWallet,
              );
            }}
          >
            {"Connect"}
          </Button>
        }
      />
    );
  }

  return <Alert type="warning" title={message.shortMessage} />;
}
