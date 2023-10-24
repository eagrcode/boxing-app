import { differenceInMinutes, differenceInDays, differenceInWeeks } from "date-fns";

export default function formatTimeAgo(timestamp: string): string {
  try {
    // Parse the timestamp into a Date object (assuming it's in GMT)
    const date = new Date(timestamp);

    // Calculate the time difference in minutes, days, and weeks
    const diffMinutes = differenceInMinutes(new Date(), date);
    const diffDays = differenceInDays(new Date(), date);
    const diffWeeks = differenceInWeeks(new Date(), date);

    // Choose the appropriate format based on the difference
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return `${diffWeeks}w`;
    }
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
}
