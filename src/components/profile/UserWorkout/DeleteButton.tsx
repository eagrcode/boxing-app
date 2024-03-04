"use client";

import styles from "./DeleteModal.module.scss";
import { useFormStatus } from "react-dom";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return <button className={styles.btnDelete}>{pending ? "Deleting..." : "Delete"}</button>;
}
