// "use client";
import type { WidgetProps } from "./Widget.types";
import type { PropsWithChildren } from "react";
import type { WidgetConfig } from "../../types";

import React from "react";

import { AppRouter } from "../../components/AppRouter";
import { DEFAULT_CONFIG } from "../../store/slices/config";
import { Main } from "../App";
import { WidgetProvider } from "../WidgetProvider";

export function Widget() {
  const config: WidgetConfig = {
    apiKey: "19193389-443b-4d59-9dd9-500bde0931c7",
    walletConnectProjectId: "489c5034628c45947388bc9a0ef2ea03",
    variant: "expanded",
    theme: {
      mode: "dark",
      fontFamily: "Arial",
      singleTheme: true,
      colors: {
        dark: {
          primary: "#4c228a",
          secondary: "#6D49A6",
          neutral: "#2c284b",
          info: "#6B3CB1",
          foreground: "#fcf7ff",
          background: "#120f29ff",
        },
      },
    },
    enableCentralizedSwappers: true,
    amount: 0,
    from: {
      blockchain: "BSC",
      token: {
        blockchain: "BSC",
        address: null,
        symbol: "BNB",
      },
    },
    to: {
      blockchain: "AVAX_CCHAIN",
      token: {
        blockchain: "AVAX_CCHAIN",
        address: null,
        symbol: "AVAX",
      },
    },
    externalWallets: false,
  };
  const isExternalWalletsEnabled = config.externalWallets;

  return (
    <AppRouter>
      {isExternalWalletsEnabled ? (
        <Main />
      ) : (
        <WidgetProvider config={config}>
          <Main />
        </WidgetProvider>
      )}
    </AppRouter>
  );
}
