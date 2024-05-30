import type { SwapFee, TagValue } from "rango-sdk";

export type NameOfFees =
  | "Swapper Fee"
  | "Affiliate Fee"
  | "Outbound network fee"
  | "Rango Fee"
  | "Network Fee";

export const NAME_OF_FEES: Record<NameOfFees, string> = {
  "Network Fee": "Network Fee",
  "Swapper Fee": "Protocol Fee",
  "Affiliate Fee": "Affiliate Fee",
  "Outbound network fee": "Outbound Fee",
  "Rango Fee": "Rango Fee",
};

export type FeesGroup = {
  payable: { [key in NameOfFees]?: SwapFee[] };
  nonePayable: { [key in NameOfFees]?: SwapFee[] };
};

export const HIGH_PRIORITY_TAGS: TagValue[] = [
  "RECOMMENDED",
  "CENTRALIZED",
  "LOWEST_FEE",
  "FASTEST",
  "HIGH_IMPACT",
];

export const GAS_FEE_MAX = 30;
