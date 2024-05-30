import type {
  HighSlippageWarning,
  InsufficientSlippageWarning,
} from "../../types";

import { Button, Divider, MessageBox, Typography } from "@/embedded/ui";
import React from "react";
import { useNavigate } from "react-router-dom";

import { navigationRoutes } from "../../constants/navigationRoutes";
import { useAppStore } from "../../store/AppStore";
import { QuoteWarningType } from "../../types";
import { getContainer } from "../../utils/common";
import { WatermarkedModal } from "../common/WatermarkedModal";

type PropsTypes = {
  open: boolean;
  confirmationDisabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
  warning: InsufficientSlippageWarning | HighSlippageWarning;
};

export function SlippageWarningModal(props: PropsTypes) {
  const { customSlippage, slippage } = useAppStore();
  const { open, onClose, onConfirm, warning, confirmationDisabled } = props;
  const navigate = useNavigate();
  const userSlippage = customSlippage ?? slippage;

  return (
    <WatermarkedModal
      anchor="bottom"
      open={open}
      prefix={
        <Button
          size="small"
          variant="ghost"
          onClick={() => navigate("../" + navigationRoutes.settings)}
        >
          <Typography variant="label" size="medium" color="$neutral900">
            {"Change settings"}
          </Typography>
        </Button>
      }
      container={getContainer()}
      onClose={onClose}
    >
      <MessageBox
        type="warning"
        title={
          warning.type === QuoteWarningType.HIGH_SLIPPAGE
            ? "High slippage"
            : "Low slippage"
        }
        description={
          warning.type === QuoteWarningType.HIGH_SLIPPAGE
            ? `Caution, your slippage is high (=${userSlippage}). Your trade may be front run.`
            : `We recommend you to increase slippage to at least ${warning.minRequiredSlippage} for this route.`
        }
      >
        <Divider size={18} />
        <Divider size={32} />
        <Button
          size="large"
          type="primary"
          variant="contained"
          fullWidth
          disabled={confirmationDisabled}
          onClick={onConfirm}
        >
          {"Confirm anyway"}
        </Button>
      </MessageBox>
    </WatermarkedModal>
  );
}
