import type { PriceImpactWarningLevel, Step } from "@rango-dev/ui";

import { TokenAmount } from "@/embedded/ui";
import React from "react";

import { getContainer } from "../../utils/common";

import { Container, separatorStyles } from "./QuoteSummary.styles";

type PropTypes = {
  from: Step["from"];
  to: Step["to"];
  percentageChange?: string | null;
  warningLevel: PriceImpactWarningLevel;
};

export function QuoteSummary(props: PropTypes) {
  const { from, to, percentageChange, warningLevel } = props;

  return (
    <Container>
      <TokenAmount
        direction="horizontal"
        label={"Swap input"}
        type="input"
        tooltipContainer={getContainer()}
        price={{
          value: from.price.value,
          usdValue: from.price.usdValue,
          realValue: from.price.realValue,
          realUsdValue: from.price.realUsdValue,
        }}
        token={{
          displayName: from.token.displayName,
          image: from.token.image,
        }}
        chain={{ image: from.chain.image }}
      />
      <div className={separatorStyles()} />
      <TokenAmount
        direction="horizontal"
        tooltipContainer={getContainer()}
        label={"Estimated output"}
        type="output"
        price={{
          value: to.price.value,
          usdValue: to.price.usdValue,
          realValue: to.price.realValue,
          realUsdValue: to.price.realUsdValue,
        }}
        token={{
          displayName: to.token.displayName,
          image: to.token.image,
        }}
        chain={{ image: to.chain.image }}
        percentageChange={percentageChange}
        warningLevel={warningLevel}
      />
    </Container>
  );
}
