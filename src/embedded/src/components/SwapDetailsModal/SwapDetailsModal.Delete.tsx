import type { DeleteContentProps } from "./SwapDetailsModal.types";

import { Button, Divider, MessageBox, Typography } from "@/embedded/ui";
import React from "react";

export const DeleteContent = ({ onDelete, onClose }: DeleteContentProps) => {
  return (
    <>
      <Divider size={20} />
      <MessageBox
        type="error"
        title={"Delete Transaction"}
        description={"Are you sure you want to delete this swap?"}
      />
      <Divider size={32} />
      <Button
        variant="contained"
        type="primary"
        size="large"
        onClick={onDelete}
      >
        {"Yes, Delete it"}
      </Button>
      <Divider size={12} />
      <Button variant="outlined" type="primary" size="large" onClick={onClose}>
        <Typography variant="title" size="medium" color="primary">
          {"No, Cancel"}
        </Typography>
      </Button>
    </>
  );
};
