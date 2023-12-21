import styles from "./DataDisplaySmall.module.scss";

export default function DataDisplaySmall({
  data,
  title,
  icon,
}: {
  data: number;
  title: string;
  icon: JSX.Element;
}) {
  return (
    <div className={styles.dataDisplaySmall}>
      <p className={styles.title}>{title}</p>
      <div className={styles.data}>{data}</div>
      <div className={styles.filter}>{icon}</div>
    </div>
  );
}
