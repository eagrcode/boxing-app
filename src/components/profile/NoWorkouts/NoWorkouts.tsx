import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import styles from "./NoWorkouts.module.scss";
import { TbListSearch } from "react-icons/tb";
import { IconType } from "react-icons"; // Make sure to import IconType

type VariantKeys = "profile-workouts" | "profile-saved" | "profile-history";

const variantProps: {
  [key in VariantKeys]: { title: string; linkURL?: string; Icon?: IconType };
} = {
  "profile-workouts": {
    title: "Create your first workout",
    linkURL: "/create",
    Icon: IoCreateOutline,
  },
  "profile-saved": {
    title: "Discover other users workouts",
    linkURL: "/discover",
    Icon: TbListSearch,
  },
  "profile-history": {
    title: "Complete an activity to view your history",
  },
};

type PropTypes = {
  variant: VariantKeys;
};

export default function NoWorkouts({ variant }: PropTypes) {
  const props = variantProps[variant];

  if (!props) {
    return null;
  }

  const { title, linkURL, Icon } = props;

  return (
    <div className={styles.noWorkouts}>
      <h1>{title}</h1>
      {linkURL && Icon && (
        <Link className={styles.createLink} href={linkURL}>
          <Icon size={40} />
        </Link>
      )}
    </div>
  );
}
