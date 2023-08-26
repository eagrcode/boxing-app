"use client";

// styles
import styles from "./LikesDisplay.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// react
import { useEffect, useState, useRef } from "react";

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikesDisplay({ id, userID, likes }) {
  // init state
  const [realtimeLikes, setRealtimeLikes] = useState(likes);

  // init suabase client
  const supabase = createClientComponentClient();

  const idRef = useRef(id);
  idRef.current = id;

  useEffect(() => {
    const channelName = `realtime-likes-${id}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "likes", filter: `workout_id=eq.${id}` },
        (payload) => {
          console.log(payload);
          switch (payload.eventType) {
            case "INSERT":
              setRealtimeLikes((prevLikes) => [...prevLikes, payload.new]);
              break;
            case "DELETE":
              setRealtimeLikes((prevLikes) =>
                prevLikes.filter((like) => like.id !== payload.old.id)
              );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, supabase, realtimeLikes, setRealtimeLikes]);

  return (
    <div className={styles.likesContainer}>
      {realtimeLikes?.length}
      <GiPunchBlast size={20} style={{ color: "var(--accent-color-blue)" }} />
    </div>
  );
}
