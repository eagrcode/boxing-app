// styles
import styles from "./LikesDisplay.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// react

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikesDisplay({ id, userID, likes }) {
  return (
    <div className={styles.likesContainer}>
      {
        <span>
          {likes?.length > 0 && `${likes?.length} ${likes?.length > 1 ? "likes" : "like"}`}
        </span>
      }
    </div>
  );
}
