import type { QuoteError, QuoteWarning, SelectedQuote } from "../../types";
import type { ReactNode } from "react";
import type { Step } from "../../interface";

export type QuoteProps = {
  type: "basic" | "list-item" | "swap-preview";
  error: QuoteError | null;
  warning: QuoteWarning | null;
  quote: SelectedQuote;
  input: { value: string; usdValue: string };
  output: { value: string; usdValue?: string };
  expanded?: boolean;
  tagHidden?: boolean;
  selected?: boolean;
  showModalFee?: boolean;
  onClickAllRoutes?: () => void;
  fullExpandedMode?: boolean;
  container?: HTMLElement;
};

export type optionProps = {
  value: string;
  label: string;
};

export type QuoteTriggerProps = {
  type: QuoteProps["type"];
  quoteRef: React.MutableRefObject<HTMLButtonElement | null>;
  selected: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  steps: Step[];
  expanded?: boolean;
  container?: HTMLElement;
};

export type QuoteTriggerImagesProps = {
  content: ReactNode;
  state?: "error" | "warning" | undefined;
  src: string;
  open?: boolean;
  className?: string;
  container?: HTMLElement;
};

export type QuoteCostDetailsProps = {
  quote: SelectedQuote | null;
  steps: number;
  fee: string;
  time: string;
  feeWarning?: boolean;
  showModalFee: boolean;
};
