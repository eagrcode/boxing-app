import styles from "./Logo.module.scss";
import Link from "next/link";

export default function Logo({ variant }: { variant: string }) {
  // check where component is rendered to alter styles
  function styleSet(variant: string) {
    switch (variant) {
      case "home":
        return `${styles.logo} ${styles.logoHome}`;
      case "nav":
        return `${styles.logo} ${styles.logoNav}`;
    }
  }

  return (
    <Link className={styleSet(variant)} href={"/"}>
      <span style={{ color: "white" }}>Beat</span>
      <span style={{ color: "var(--accent-color-blue)" }}>down</span>
    </Link>
  );
}
