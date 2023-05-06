import { formatRelative } from "date-fns";

export const endDateToRelative = (date: string): string => formatRelative(new Date(date), new Date());
