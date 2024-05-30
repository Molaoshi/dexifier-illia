import { Typography } from "@/embedded/ui";
import React from "react";

import { SlippageTooltipContainer } from "./Slippage.styles";

export function SlippageTooltipContent() {
  return (
    <SlippageTooltipContainer>
      <Typography variant="label" size="medium" color="neutral700">
        {
          "Your transaction will be reverted if the price changes unfavorably by more than this percentage"
        }
        <br />
        <br />
        <b>{"Warning"}</b>:
        {
          "This setting is applied per step (e.g. 1Inch, Thorchain, etc) which means only the step will be reverted, not the whole transaction."
        }
      </Typography>
    </SlippageTooltipContainer>
  );
}
