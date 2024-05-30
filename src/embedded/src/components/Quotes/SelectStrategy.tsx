import type { PreferenceType } from "rango-sdk";

import { Select } from "@rango-dev/ui";
import React from "react";

import { useQuoteStore } from "../../store/quote";

import { SelectContainer } from "./Quotes.styles";

export function SelectStrategy(props: { container: HTMLElement }) {
  const { updateQuotePartialState, sortStrategy } = useQuoteStore();

  const ROUTE_STRATEGY: { value: PreferenceType; label: string }[] = [
    {
      value: "SMART",
      label: "Smart Routing",
    },
    {
      value: "FEE",
      label: "Lowest Fee",
    },
    {
      value: "SPEED",
      label: "Fastest Transfer",
    },
    {
      value: "NET_OUTPUT",
      label: "Maximum Return",
    },
    {
      value: "PRICE",
      label: "Maximum Output",
    },
  ];

  return (
    <SelectContainer>
      <Select
        container={props.container}
        options={ROUTE_STRATEGY}
        value={sortStrategy}
        handleItemClick={(item) => {
          updateQuotePartialState("sortStrategy", item.value);
        }}
        variant="filled"
      />
    </SelectContainer>
  );
}
