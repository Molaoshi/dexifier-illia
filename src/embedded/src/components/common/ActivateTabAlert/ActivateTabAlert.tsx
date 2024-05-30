import type { PropTypes } from "./ActivateTabAlert.types";

import { Alert, Button } from "@/embedded/ui";
import React from "react";

export function ActivateTabAlert(props: PropTypes) {
  return (
    <Alert
      action={
        <Button
          onClick={props.onActivateTab}
          variant="contained"
          size="xxsmall"
          type="warning"
        >
          {"Activate this tab"}
        </Button>
      }
      type="warning"
      variant="alarm"
      title={"Another tab is open and handles transactions."}
    />
  );
}
