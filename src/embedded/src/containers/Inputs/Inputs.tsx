import type { PropTypes } from "./Inputs.types";

import { SwapInput } from "@/embedded/ui";
import React, { useEffect } from "react";

import { SwitchFromAndToButton } from "../../components/SwitchFromAndTo";
import { errorMessages } from "../../constants/errors";
import {
  PERCENTAGE_CHANGE_MAX_DECIMALS,
  PERCENTAGE_CHANGE_MIN_DECIMALS,
  TOKEN_AMOUNT_MAX_DECIMALS,
  TOKEN_AMOUNT_MIN_DECIMALS,
  USD_VALUE_MAX_DECIMALS,
  USD_VALUE_MIN_DECIMALS,
} from "../../constants/routing";
import { useQuoteStore } from "../../store/quote";
import { useWalletsStore } from "../../store/wallets";
import { getContainer } from "../../utils/common";
import { formatTooltipNumbers, numberToString } from "../../utils/numbers";
import { getPriceImpact, getPriceImpactLevel } from "../../utils/quote";
import { canComputePriceImpact } from "../../utils/swap";
import { formatBalance, isFetchingBalance } from "../../utils/wallets";

import { Container, FromContainer } from "./Inputs.styles";
import { brotliDecompress } from "zlib";

export function Inputs(props: PropTypes) {
  const { fetchingQuote, fetchMetaStatus, onClickToken, isExpandable } = props;
  const {
    fromToken,
    fromBlockchain,
    toToken,
    toBlockchain,
    setInputAmount,
    inputAmount,
    inputUsdValue,
    outputAmount,
    outputUsdValue,
    selectedQuote,
  } = useQuoteStore();
  const { connectedWallets, getBalanceFor } = useWalletsStore();
  const fromTokenBalance = fromToken ? getBalanceFor(fromToken) : null;

  const fromTokenFormattedBalance =
    formatBalance(fromTokenBalance)?.amount ?? "0";

  const tokenBalanceReal =
    !!fromBlockchain && !!fromToken
      ? numberToString(fromTokenBalance?.amount, fromTokenBalance?.decimals)
      : "0";

  const fetchingBalance =
    !!fromBlockchain &&
    isFetchingBalance(connectedWallets, fromBlockchain.name);

  const priceImpactInputCanNotBeComputed = !canComputePriceImpact(
    selectedQuote,
    inputAmount,
    inputUsdValue,
  );

  const priceImpactOutputCanNotBeComputed = !canComputePriceImpact(
    selectedQuote,
    inputAmount,
    outputUsdValue,
  );

  const percentageChange =
    !inputUsdValue || !outputUsdValue || !outputUsdValue.gt(0)
      ? null
      : getPriceImpact(inputUsdValue.toString(), outputUsdValue.toString());

  useEffect(() => {
    if (inputAmount === "0") {
      setInputAmount("");
    }
  }, [inputAmount]);

  return (
    <Container>
      <FromContainer>
        <SwapInput
          styles={{ borderRadius: "30px" }}
          label={"From"}
          mode="From"
          onInputChange={setInputAmount}
          balance={fromTokenFormattedBalance}
          chain={{
            displayName: fromBlockchain?.displayName || "",
            image: fromBlockchain?.logo || "",
          }}
          token={{
            displayName: fromToken?.symbol || "",
            image: fromToken?.image || "",
          }}
          onClickToken={() => onClickToken("from")}
          price={{
            value: inputAmount,
            usdValue: priceImpactInputCanNotBeComputed
              ? undefined
              : numberToString(
                  inputUsdValue,
                  USD_VALUE_MIN_DECIMALS,
                  USD_VALUE_MAX_DECIMALS,
                ),
            realUsdValue: priceImpactInputCanNotBeComputed
              ? undefined
              : formatTooltipNumbers(inputUsdValue),
            error: priceImpactInputCanNotBeComputed
              ? errorMessages().unknownPriceError.impactTitle
              : undefined,
          }}
          disabled={fetchMetaStatus === "failed"}
          loading={fetchMetaStatus === "loading"}
          loadingBalance={fetchingBalance}
          tooltipContainer={getContainer()}
          onSelectMaxBalance={() => {
            setInputAmount(tokenBalanceReal.split(",").join(""));
          }}
        />
        {/* <SwitchFromAndToButton /> */}
      </FromContainer>
      <SwapInput
        sharpBottomStyle={!isExpandable && (!!selectedQuote || fetchingQuote)}
        label={"To"}
        mode="To"
        fetchingQuote={fetchingQuote}
        chain={{
          displayName: toBlockchain?.displayName || "",
          image: toBlockchain?.logo || "",
        }}
        token={{
          displayName: toToken?.symbol || "",
          image: toToken?.image || "",
        }}
        percentageChange={numberToString(
          getPriceImpact(inputUsdValue, outputUsdValue),
          PERCENTAGE_CHANGE_MIN_DECIMALS,
          PERCENTAGE_CHANGE_MAX_DECIMALS,
        )}
        warningLevel={getPriceImpactLevel(percentageChange ?? 0)}
        price={{
          value: numberToString(
            outputAmount,
            TOKEN_AMOUNT_MIN_DECIMALS,
            TOKEN_AMOUNT_MAX_DECIMALS,
          ),
          usdValue: priceImpactOutputCanNotBeComputed
            ? undefined
            : numberToString(
                outputUsdValue,
                USD_VALUE_MIN_DECIMALS,
                USD_VALUE_MAX_DECIMALS,
              ),
          realValue: formatTooltipNumbers(outputAmount),
          realUsdValue: priceImpactOutputCanNotBeComputed
            ? undefined
            : formatTooltipNumbers(outputUsdValue),
          error: priceImpactOutputCanNotBeComputed
            ? errorMessages().unknownPriceError.impactTitle
            : undefined,
        }}
        onClickToken={() => onClickToken("to")}
        disabled={fetchMetaStatus === "failed"}
        loading={fetchMetaStatus === "loading"}
        tooltipContainer={getContainer()}
      />
    </Container>
  );
}
