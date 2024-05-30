'use client'
import React from "react";
import { useRoutes } from "react-router-dom";

import { navigationRoutes } from "../constants/navigationRoutes";
import { useSyncStoresWithConfig } from "../hooks/useSyncStoresWithConfig";
import { useSyncUrlAndStore } from "../hooks/useSyncUrlAndStore";
import { ConfirmSwapPage } from "../page/ConfirmSwapPage";
import { HistoryPage } from "../page/HistoryPage";
import { Widget } from "../page/Widget";
import { LiquiditySourcePage } from "../page/LiquiditySourcePage";
import { RoutesPage } from "../page/Routes";
import { SelectBlockchainPage } from "../page/SelectBlockchainPage";
import { SelectSwapItemsPage } from "../page/SelectSwapItemsPage";
import { SettingsPage } from "../page/SettingsPage";
import { SwapDetailsPage } from "../page/SwapDetailsPage";
import { WalletsPage } from "../page/WalletsPage";

export function AppRoutes() {
  /**
   * The configuration of the widget should initially be applied to the widget state.
   * If search parameters exist in the URL,
   * they should be applied later and take precedence over the widget configuration.
   * To achieve this, it is crucial to execute these hooks in the correct sequence.
   */
  useSyncStoresWithConfig();
  useSyncUrlAndStore();

  return useRoutes([
    {
      path: navigationRoutes.home,
      element: <Widget />,
    },
    {
      path: navigationRoutes.routes,
      element: <RoutesPage />,
    },
    {
      path: navigationRoutes.fromSwap,
      children: [
        {
          index: true,
          element: <SelectSwapItemsPage type="source" />,
        },
        {
          path: navigationRoutes.blockchains,
          element: <SelectBlockchainPage type="source" />,
        },
      ],
    },
    {
      path: navigationRoutes.toSwap,
      children: [
        {
          index: true,
          element: <SelectSwapItemsPage type="destination" />,
        },
        {
          path: navigationRoutes.blockchains,
          element: <SelectBlockchainPage type="destination" />,
        },
      ],
    },
    {
      path: navigationRoutes.settings,
      children: [
        {
          index: true,
          element: <SettingsPage />,
        },
        {
          path: navigationRoutes.exchanges,
          element: <LiquiditySourcePage sourceType="Exchanges" />,
        },
        {
          path: navigationRoutes.bridges,
          element: <LiquiditySourcePage sourceType="Bridges" />,
        },
      ],
    },
    {
      path: navigationRoutes.swaps,
      children: [
        {
          index: true,
          element: <HistoryPage />,
        },
        {
          path: navigationRoutes.swapDetails,
          element: <SwapDetailsPage />,
        },
      ],
    },
    {
      path: navigationRoutes.wallets,
      element: <WalletsPage />,
    },
    {
      path: navigationRoutes.confirmSwap,
      element: <ConfirmSwapPage />,
    },
  ]);
}
