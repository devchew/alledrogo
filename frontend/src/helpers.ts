import { formatRelative } from "date-fns";

export const endDateToRelative = (date: string): string => formatRelative(new Date(date), new Date());

export function getTimeRemaining(endDate) {
  const currentTime = new Date();
  const endTime = new Date(endDate);

  const timeRemaining = endTime.getTime() - currentTime.getTime();

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${days}d:${hours}h:${minutes}m`;

}
