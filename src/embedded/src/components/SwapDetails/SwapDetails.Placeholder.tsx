import type { SwapDetailsPlaceholderPropTypes } from "./SwapDetails.types";

import { Divider, NotFound, Skeleton, Typography } from "@/embedded/ui";
import React from "react";

import { SuffixContainer } from "../HeaderButtons/HeaderButtons.styles";
import { Layout } from "../Layout";
import { LoadingSwapDetails } from "../LoadingSwapDetails";

import {
  Container,
  datePlaceholderStyles,
  HeaderDetails,
  PlaceholderContainer,
  requestIdStyles,
  rowStyles,
} from "./SwapDetails.styles";

export function SwapDetailsPlaceholder(props: SwapDetailsPlaceholderPropTypes) {
  const { requestId, showSkeleton } = props;
  return (
    <Layout
      header={{
        title: "Swap and Bridge",
        suffix: <SuffixContainer />,
      }}
    >
      {showSkeleton && (
        <Container>
          <HeaderDetails>
            <div className={rowStyles()}>
              <Typography variant="label" size="large" color="neutral700">
                {`${"Request ID"}:`}
              </Typography>
              <div className={requestIdStyles()}>
                <Typography variant="label" size="small" color="neutral700">
                  <Skeleton width={60} height={10} variant="rounded" />
                </Typography>
                <Divider direction="horizontal" size={4} />
                <Skeleton width={16} height={16} variant="rectangular" />
                <Divider direction="horizontal" size={4} />
                <Skeleton width={16} height={16} variant="rectangular" />
              </div>
            </div>
            <div className={rowStyles()}>
              <Typography
                className={datePlaceholderStyles()}
                variant="label"
                size="large"
                color="neutral700"
              >
                <Skeleton width={60} height={10} variant="rounded" />
              </Typography>
              <Typography variant="label" size="small" color="neutral700">
                <Skeleton width={60} height={10} variant="rounded" />
              </Typography>
            </div>
          </HeaderDetails>
          <LoadingSwapDetails />
        </Container>
      )}
      {!showSkeleton && (
        <PlaceholderContainer>
          <NotFound
            title={"Not found"}
            description={`Swap with request ID = ${requestId} not found.`}
          />
        </PlaceholderContainer>
      )}
    </Layout>
  );
}
