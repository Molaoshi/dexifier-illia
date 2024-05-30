import type { PendingSwap } from "rango-types";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function timeSince(millisecond: number) {
  const date = new Date(millisecond);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const isToday = date.getDay() === new Date().getDay();
  const formattedDate = isToday
    ? "Today"
    : `${daysOfWeek[date.getDay()]} ${day} ${month} ${year}`;

  return `${formattedDate}, ${new Date(millisecond).toLocaleTimeString()}`;
}

export function getSwapDate(pendingSwap: PendingSwap) {
  const time = pendingSwap.finishTime
    ? timeSince(parseInt(pendingSwap.finishTime))
    : timeSince(parseInt(pendingSwap.creationTime));
  return time;
}
