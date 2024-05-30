import type {
  BridgeLimitError,
  InsufficientSlippageError,
  QuoteWarning,
} from "../../types";

import { errorMessages } from "../../constants/errors";
import { QuoteErrorType, QuoteWarningType } from "../../types";
import { getPriceImpactLevel } from "../../utils/quote";

type AlertInfo = {
  alertType: "error" | "warning";
  title: string;
  action: "show-info" | "change-settings" | null;
};

export function makeAlerts(
  warning: QuoteWarning | null,
  error: BridgeLimitError | InsufficientSlippageError | null,
): AlertInfo | null {
  const alertInfo: AlertInfo = {
    alertType: "warning",
    title: "",
    action: null,
  };
  if (error) {
    alertInfo.alertType = "error";
    if (error.type === QuoteErrorType.BRIDGE_LIMIT) {
      alertInfo.title = error.recommendation;
    }

    if (error.type === QuoteErrorType.INSUFFICIENT_SLIPPAGE) {
      alertInfo.title = `You need to increase slippage to at least ${error.minRequiredSlippage} for this route`;
      alertInfo.action = "change-settings";
    }

    return alertInfo;
  }
  if (warning) {
    if (warning.type === QuoteWarningType.HIGH_VALUE_LOSS) {
      const warningLevel = getPriceImpactLevel(warning.priceImpact);
      if (warningLevel === "high") {
        alertInfo.alertType = "error";
      }
      alertInfo.action = "show-info";
      alertInfo.title = errorMessages().highValueLossError.title;
    }
    if (warning.type === QuoteWarningType.UNKNOWN_PRICE) {
      alertInfo.title = errorMessages().unknownPriceError.title;
    }
    if (warning.type === QuoteWarningType.INSUFFICIENT_SLIPPAGE) {
      alertInfo.title = `We recommend you to increase slippage to at least ${warning.minRequiredSlippage} for this route`;
      alertInfo.action = "change-settings";
    }
    if (warning.type === QuoteWarningType.HIGH_SLIPPAGE) {
      alertInfo.title = "Caution, your slippage is high.";
      alertInfo.action = "change-settings";
    }
    return alertInfo;
  }
  return null;
}
