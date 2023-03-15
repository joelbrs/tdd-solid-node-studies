import { setYear, parseISO } from "date-fns";

/**
 * receives: "2023-03-15" and returns "2024-03-15"
 */

export function getFutureDate(date: string) {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}