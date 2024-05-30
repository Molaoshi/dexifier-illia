import type { PropTypes } from "./HeaderButtons.types";

import { Button, Typography } from "@/embedded/ui";
import React from "react";

import { SuffixContainer } from "./HeaderButtons.styles";

function CancelButton(props: PropTypes) {
  return (
    <SuffixContainer>
      <Button variant="ghost" onClick={props.onClick} size="xsmall">
        <Typography variant="label" size="medium" color="error500">
          {"Cancel"}
        </Typography>
      </Button>
    </SuffixContainer>
  );
}

export { CancelButton };
