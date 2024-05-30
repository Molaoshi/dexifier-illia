import type { PropTypes } from "./BlockchainList.types";
import type { BlockchainMeta } from "rango-sdk";

import {
  Divider,
  Image,
  ListItemButton,
  NotFound,
  Typography,
} from "@/embedded/ui";
import React, { useEffect, useState } from "react";

import { useAppStore } from "../../store/AppStore";

import { filterBlockchains } from "./BlockchainList.helpers";
import { Container, List } from "./BlockchainList.styles";
import { LoadingBlockchainList } from "./LoadingBlockchainList";

export function BlockchainList(props: PropTypes) {
  const { list, searchedFor, onChange, blockchainCategory } = props;
  const [blockchains, setBlockchains] = useState<BlockchainMeta[]>(list);
  const { fetchStatus } = useAppStore();

  useEffect(() => {
    setBlockchains([
      ...filterBlockchains(list, searchedFor, blockchainCategory),
    ]);
  }, [list, searchedFor, blockchainCategory]);

  const renderList = () => {
    if (!blockchains.length && !!searchedFor) {
      return (
        <>
          <Divider size={32} />
          <NotFound
            title={"No results found"}
            description={"Try using different keywords"}
          />
        </>
      );
    }
    return (
      <List as="ul" key={`${blockchainCategory}-${searchedFor}`}>
        {blockchains.map((item) => (
          <ListItemButton
            key={`${item.name}-${item.chainId}`}
            hasDivider
            onClick={() => onChange(item)}
            start={<Image src={item.logo} size={30} />}
            title={
              <Typography
                variant="title"
                size="medium"
                className={undefined}
                color={undefined}
              >
                {item.displayName}
              </Typography>
            }
            id={item.chainId as string}
          />
        ))}
      </List>
    );
  };

  return (
    <Container>
      <Typography
        variant="label"
        size="large"
        className={undefined}
        color={undefined}
      >
        {"Select Blockchain"}
      </Typography>
      <Divider size={4} />
      {fetchStatus === "loading" && <LoadingBlockchainList />}
      {fetchStatus === "success" && renderList()}
    </Container>
  );
}
