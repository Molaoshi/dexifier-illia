import type { CancelContentProps } from "./SwapDetailsModal.types";

import { Button, Divider, MessageBox } from "@/embedded/ui";
import React from "react";

export const CancelContent = ({ onCancel, onClose }: CancelContentProps) => {
  return (
    <>
      <Divider size={20} />
      <MessageBox
        type="error"
        title={"Cancel Swap"}
        description={"Are you sure you want to cancel this swap?"}
      />
      <Divider size={32} />
      <Button
        variant="contained"
        type="primary"
        size="large"
        onClick={onCancel}
      >
        {"Yes, Cancel it"}
      </Button>
      <Divider size={12} />
      <Button variant="outlined" type="primary" size="large" onClick={onClose}>
        {"No, Continue"}
      </Button>
    </>
  );
};
