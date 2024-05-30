import type { PropTypes } from "./ActivateTabModal.types";

import { Button, Divider, MessageBox } from "@/embedded/ui";
import React from "react";

import { getContainer } from "../../../utils/common";
import { WatermarkedModal } from "../WatermarkedModal";

export function ActivateTabModal(props: PropTypes) {
  const { open, onClose, onConfirm } = props;

  return (
    <WatermarkedModal
      open={open}
      dismissible
      onClose={onClose}
      container={getContainer()}
    >
      <MessageBox
        title={"Activate current tab"}
        type="warning"
        description={
          "Currently, some transactions are running and being handled by other browser tab. If you activate this tab, all transactions that are already in the transaction sign step will expire."
        }
      >
        <Divider size={20} />
        <Button
          variant="contained"
          size="large"
          type="primary"
          fullWidth
          onClick={onConfirm}
        >
          {"Confirm"}
        </Button>
      </MessageBox>
    </WatermarkedModal>
  );
}
