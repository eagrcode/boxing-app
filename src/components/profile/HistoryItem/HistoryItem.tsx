import Link from "next/link";
import styles from "./HistoryItem.module.scss";

export default function HistoryItem({
  id,
  createdAt,
  title,
}: {
  id: string;
  createdAt: string;
  title: string;
}) {
  function formatUKDateTime(createdAt: string) {
    const dateObj = new Date(createdAt);
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(dateObj);
    const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(dateObj);

    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <li className={styles.item}>
      <Link className={styles.itemLink} href={`/workout/${id}`}>
        <div>{title}</div>
        <div>{formatUKDateTime(createdAt)}</div>
      </Link>
    </li>
  );
}
