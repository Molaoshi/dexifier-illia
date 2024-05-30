import { Alert, Button, styled } from "@/embedded/ui";
import React from "react";
import { useInRouterContext, useSearchParams } from "react-router-dom";

import { Layout, PageContainer } from "../components/Layout";
import { Slippage } from "../components/Slippage";
import { SearchParams } from "../constants/searchParams";
import { SettingsLists } from "../containers/Settings/Lists";
import { useAppStore } from "../store/AppStore";

const ResetAction = styled("div", {
  paddingLeft: "$8",
});

export function SettingsPage() {
  const { isInCampaignMode, updateCampaignMode } = useAppStore();
  const campaignMode = isInCampaignMode();

  const [, setSearchParams] = useSearchParams();
  const isRouterInContext = useInRouterContext();

  const onClick = () => {
    if (isRouterInContext && campaignMode) {
      setSearchParams(
        (prev) => {
          prev.delete(SearchParams.LIQUIDITY_SOURCES);
          return prev;
        },
        { replace: true },
      );
      updateCampaignMode("liquiditySources", undefined);
    }
  };
  return (
    <Layout
      header={{
        title: "Settings",
      }}
    >
      <PageContainer>
        {campaignMode && (
          <Alert
            type="info"
            variant="alarm"
            title={
              "Currently, you're in campaign mode with restrictions on liquidity sources. Would you like to switch out of this mode and make use of all available liquidity sources?"
            }
            action={
              <ResetAction>
                <Button type="secondary" size="small" onClick={onClick}>
                  {"Reset"}
                </Button>
              </ResetAction>
            }
          />
        )}
        <Slippage />
        <SettingsLists />
      </PageContainer>
    </Layout>
  );
}
