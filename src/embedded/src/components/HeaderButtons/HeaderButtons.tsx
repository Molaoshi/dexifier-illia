import type { HeaderButtonsPropTypes } from "./HeaderButtons.types";

import { SettingsIcon, Tooltip, TransactionIcon } from "@/embedded/ui";
import React from "react";

import { useAppStore } from "../../store/AppStore";
import { getContainer } from "../../utils/common";
// import { isFeatureHidden } from "../../utils/settings";
// import { NotificationContent } from "../NotificationContent";

import { HeaderButton } from "./HeaderButtons.styles";
import InProgressTransactionBadge from "./InProgressTransactionBadge";
import { RefreshButton } from "./RefreshButton";

export function HeaderButtons(props: HeaderButtonsPropTypes) {
  const {
    onClickRefresh,
    onClickHistory,
    onClickSettings,
    hidden = [],
    container,
  } = props;

  // const {
  //   config: { features },
  // } = useAppStore();

  return (
    <>
      {!hidden.includes("refresh") && (
        <Tooltip
          container={container || getContainer()}
          side="top"
          content={"Refresh"}
        >
          <RefreshButton onClick={onClickRefresh} />
        </Tooltip>
      )}
      {!hidden.includes("settings") && (
        <Tooltip container={getContainer()} side="top" content={"Settings"}>
          <HeaderButton size="small" variant="ghost" onClick={onClickSettings}>
            <SettingsIcon size={18} color="black" />
          </HeaderButton>
        </Tooltip>
      )}
      {!hidden.includes("history") && (
        <Tooltip
          container={getContainer()}
          side="top"
          content={"Transactions History"}
        >
          <HeaderButton size="small" variant="ghost" onClick={onClickHistory}>
            <TransactionIcon size={18} color="black" />
            <InProgressTransactionBadge />
          </HeaderButton>
        </Tooltip>
      )}
    </>
  );
}
