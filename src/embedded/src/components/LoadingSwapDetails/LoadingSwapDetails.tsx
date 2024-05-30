import { Divider, Skeleton, Typography } from "@/embedded/ui";
import React from "react";

import { QuoteSummarySkeleton, StepSkeleton } from "../QuoteSkeleton";

import {
  Container,
  extraInfoStyles,
  StepContainer,
  StepSeparator,
} from "./LoadingSwapDetails.styles";

export function LoadingSwapDetails() {
  return (
    <Container>
      <QuoteSummarySkeleton type="swap-preview" />
      <div className="swaps-steps">
        <Typography variant="title" size="small">
          {"Swaps steps"}
        </Typography>
      </div>

      <>
        <StepContainer>
          <StepSkeleton separator={false} />
          <div className={extraInfoStyles()}>
            <Divider direction="horizontal" size={20} />
            <Skeleton height={22} variant="rectangular" />
          </div>
        </StepContainer>
        <StepSeparator />
        <StepContainer>
          <StepSkeleton separator={false} />
        </StepContainer>
        <StepSeparator />
        <StepContainer>
          <StepSkeleton separator={false} />
        </StepContainer>
        <StepSeparator />
        <StepContainer>
          <StepSkeleton separator={false} />
        </StepContainer>
      </>
    </Container>
  );
}
