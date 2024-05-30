import { css, darkTheme, IconButton, styled, TextField } from "@/embedded/ui";

export const Title = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const ListContainer = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "$10",
  flexWrap: "wrap",
  paddingTop: "$5",
  height: "100%",
});

export const WalletButton = styled("button", {
  borderRadius: "$xm",
  padding: "$10",
  border: "0",
  display: "flex",
  justifyContent: "center",
  $$color: "$colors$neutral100",
  [`.${darkTheme} &`]: {
    $$color: "$colors$neutral300",
  },
  backgroundColor: "$$color",
  alignItems: "center",
  cursor: "pointer",
  width: 110,
  position: "relative",

  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${darkTheme} &`]: {
      $$color: "$colors$neutral100",
    },
    backgroundColor: "$$color",
  },

  "&:focus-visible": {
    $$color: "$colors$secondary100",
    [`.${darkTheme} &`]: {
      $$color: "$colors$info700",
    },
    backgroundColor: "$$color",
    outline: 0,
  },
  variants: {
    selected: {
      true: {
        outlineWidth: 1,
        outlineColor: "$secondary",
        outlineStyle: "solid",
      },
    },
  },
});

export const ShowMoreWallets = styled(WalletButton, {
  alignSelf: "stretch",
  minHeight: "93px",
});
export const ShowMoreHeader = styled("div", {
  padding: "$20 $20 $15 $20",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$neutral200",
  position: "relative",
  width: "100%",
});

export const NavigateBack = styled(IconButton, {
  position: "absolute",
  left: "$20",
});

export const WalletsContainer = styled("div", {
  paddingTop: "$20",
});

export const walletsListStyles = css({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "$10",
  flexWrap: "wrap",
  paddingTop: "$5",
  height: "100%",
});

export const CustomDestination = styled("div", {
  padding: "$10 $0",
  "& .button__content": {
    display: "flex",
    alignItems: "center",
  },
  "& .alarms": { paddingTop: "$5" },
  "& .collapsible_content": {
    backgroundColor: "$neutral100",
  },
  "& .collapsible_root": {
    backgroundColor: "$neutral100",
  },
});

export const alarmsStyles = css({
  paddingTop: "$5",
});

export const ConfirmButton = styled("div", {
  display: "flex",
});

export const StyledTextField = styled(TextField, {
  backgroundColor: "$neutral100",
  padding: "$0 $15 $15 $15",
});

export const Wallets = styled("div", { overflow: "visible", width: "100%" });

export const CustomDestinationButton = styled("div", {
  width: "100%",
  borderRadius: "$sm",
  display: "flex",
  padding: "$15",
  justifyContent: "space-between",
  alignItems: "center",
  $$color: "$colors$neutral100",
  [`.${darkTheme} &`]: {
    $$color: "$colors$neutral300",
  },
  backgroundColor: "$$color",
  borderBottomRightRadius: "0",
  borderBottomLeftRadius: "0",
  "&:hover": {
    $$color: "$colors$secondary100",
    [`.${darkTheme} &`]: {
      $$color: "$colors$neutral100",
    },
    backgroundColor: "$$color",
  },
  "&:focus-visible": {
    $$background: "$colors$secondary100",
    [`.${darkTheme} &`]: {
      $$background: "$colors$info700",
    },
    backgroundColor: "$$background",
    outline: 0,
  },
});
