"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./DataDisplaySmall.module.scss";

export default function DataDisplaySmall({
  index,
  data,
  title,
  icon,
  queryParam,
  isActive,
  currentQuery,
}: {
  index: number;
  data: number;
  title: string;
  icon: JSX.Element;
  queryParam: string;
  isActive: boolean;
  currentQuery: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelect(param: string) {
    if (isActive) return;

    const params = new URLSearchParams(searchParams);

    param ? params.set("query", param) : params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      onClick={() => handleSelect(queryParam)}
      className={`${styles.dataDisplaySmall} ${isActive && styles.isActive}`}
    >
      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        <div className={styles.filter}>{icon}</div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.data}>{data}</p>
        <p className={styles.completed}>completed</p>
      </div>
    </div>
  );
}
