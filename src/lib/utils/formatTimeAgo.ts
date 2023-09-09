// format created_at response from db
export default function timeAgo(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();

  const diffInSeconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute: number = 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  const week: number = day * 7;
  const month: number = day * 30; // Approximation
  const year: number = day * 365; // Approximation

  if (diffInSeconds < minute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < hour) {
    return `${Math.floor(diffInSeconds / minute)} m`;
  } else if (diffInSeconds < day) {
    return `${Math.floor(diffInSeconds / hour)} hr`;
  } else if (diffInSeconds < week) {
    return `${Math.floor(diffInSeconds / day)} d`;
  } else if (diffInSeconds < month) {
    return `${Math.floor(diffInSeconds / week)} weeks ago`;
  } else if (diffInSeconds < year) {
    return `${Math.floor(diffInSeconds / month)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / year)} years ago`;
  }
}
