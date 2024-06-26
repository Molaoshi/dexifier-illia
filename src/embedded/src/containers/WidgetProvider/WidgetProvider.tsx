import type { PropTypes } from "./WidgetProvider.types";
import type { PropsWithChildren } from "react";

import React, { useEffect, useMemo } from "react";

import { DEFAULT_BASE_URL, RANGO_PUBLIC_API_KEY } from "../../constants";
import useFontLoader from "../../hooks/useFontLoader";
import QueueManager from "../../QueueManager";
import { initConfig } from "../../utils/configs";
import { WidgetWallets } from "../Wallets";
import { WidgetInfo } from "../WidgetInfo";

export function WidgetProvider(props: PropsWithChildren<PropTypes>) {
  const { onUpdateState, config } = props;

  useMemo(() => {
    initConfig({
      API_KEY: config?.apiKey || RANGO_PUBLIC_API_KEY,
      BASE_URL: config?.apiUrl || DEFAULT_BASE_URL,
    });
  }, [config.apiKey, config.apiUrl]);

  const fontFamily = props.config?.theme?.fontFamily;

  const { handleLoadCustomFont } = useFontLoader();

  useEffect(() => {
    if (fontFamily) {
      handleLoadCustomFont(fontFamily);
    }
  }, [fontFamily]);

  return (
    <WidgetWallets config={config} onUpdateState={onUpdateState}>
      <QueueManager apiKey={config.apiKey}>
        <WidgetInfo>{props.children}</WidgetInfo>
      </QueueManager>
    </WidgetWallets>
  );
}
