// format created_at response from db
export default function timeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();

  const diffInSeconds = Math.floor((now - date) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Approximation
  const year = day * 365; // Approximation

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
