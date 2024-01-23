import styles from "./FilterBtns.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PropTypes = {
  filter: string;
  isActive: boolean;
  text: string;
  activeTileParam: string;
};

export default function FilterBtns({ filter, isActive, text, activeTileParam }: PropTypes) {
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
    <button
      onClick={() => handleSelect(activeTileParam + filter)}
      className={`${styles.filterBtn} ${isActive && styles.isActive}`}
    >
      {text}
    </button>
  );
}
