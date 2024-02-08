import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from "date-fns";

export default function formatTimeAgo(timestamp: string): string {
  try {
    const date = new Date(timestamp);

    const diffMinutes = differenceInMinutes(new Date(), date);
    const diffHours = differenceInHours(new Date(), date);
    const diffDays = differenceInDays(new Date(), date);
    const diffWeeks = differenceInWeeks(new Date(), date);

    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    }
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
}
