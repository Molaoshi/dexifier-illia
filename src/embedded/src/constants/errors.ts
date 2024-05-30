import type { QuoteError } from "../types";

import { QuoteErrorType } from "../types";

export const errorMessages = () => {
  return {
    genericServerError: "Failed Network, Please retry your swap.",
    liquiditySourcesError: {
      title: "Please reset your liquidity sources.",
      description:
        "You have limited the liquidity sources and this might result in Rango finding no routes. Please consider resetting your liquidity sources.",
    },
    noResultError: {
      title: "No Routes Found.",
      description:
        "Reasons why Rango couldn't find a route: low liquidity on token, very low input amount or no routes available for the selected input/output token combination.",
    },
    bridgeLimitErrors: {
      increaseAmount: "Bridge Limit Error: Please increase your amount.",
      decreaseAmount: "Bridge Limit Error: Please decrease your amount.",
    },
    highValueLossError: {
      impactTitle: "High Price Impact",
      title: "Price impact is too high!",
      description:
        "The price impact is significantly higher than the allowed amount.",
      confirmMessage: "Confirm high price impact",
    },
    quoteUpdatedWithHighValueLoss: {
      title: "Route updated and price impact is too high, try again later!",
    },
    unknownPriceError: {
      impactTitle: "USD Price Unknown",
      title: "USD Price Unknown, Cannot calculate Price Impact.",
      description:
        "USD Price Unknown, Cannot calculate Price Impact. The price impact may be higher than usual. Are you sure to continue the Swap?",
      confirmMessage: "Confirm USD Price Unknown",
    },
  };
};

export function getQuoteErrorMessage(error: QuoteError) {
  switch (error.type) {
    case QuoteErrorType.NO_RESULT:
      return error.diagnosisMessage ?? errorMessages().noResultError.title;
    case QuoteErrorType.REQUEST_FAILED:
      return errorMessages().genericServerError;
    default:
      return "";
  }
}
