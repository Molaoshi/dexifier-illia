import { Divider, NoNotificationIcon, Typography } from "@/embedded/ui";
import React from "react";

import { NotFoundContainer } from "./NotificationContent.styles";

export function NotificationNotFound() {
  return (
    <NotFoundContainer>
      <NoNotificationIcon color="secondary" size={26} />
      <Divider size={12} />
      <Typography variant="body" size="medium" color="neutral700">
        {"There are no notifications."}
      </Typography>
    </NotFoundContainer>
  );
}
