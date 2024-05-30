import React from "react";
import { TypographySample, StepDetailsSample } from ".";
// import { Typography } from "@rango-dev/ui";
import { TypographyType, StepDetailsType } from "../src/interface";
const Typography = ({
  children,
  className,
  color,
  variant,
  size,
  align,
}: TypographyType) => {
  return (
    <TypographySample
      className={className}
      color={color}
      variant={variant}
      size={size}
      algin={align}
    >{children}</TypographySample>
  );
};

const StepDetails = ({ props, step }: any) => {
  return <StepDetailsSample step={step} {...props} />;
};

export { Typography, StepDetails };
