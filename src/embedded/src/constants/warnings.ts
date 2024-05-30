import type { QuoteUpdateWarning } from "../types";

import { QuoteUpdateType } from "../types";

export function getQuoteUpdateWarningMessage(warning: QuoteUpdateWarning) {
  switch (warning.type) {
    case QuoteUpdateType.QUOTE_UPDATED:
      return "Route has been updated.";
    case QuoteUpdateType.QUOTE_AND_OUTPUT_AMOUNT_UPDATED:
      return (
        `Output amount changed to ${warning.newOutputAmount} (${warning.percentageChange}% change).`
      );
    case QuoteUpdateType.QUOTE_SWAPPERS_UPDATED:
      return "Route swappers has been updated.";
    case QuoteUpdateType.QUOTE_COINS_UPDATED:
      return "Route internal coins has been updated.";
    default:
      return "";
  }
}
