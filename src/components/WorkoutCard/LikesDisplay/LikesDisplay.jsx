"use client";

// styles
import styles from "./LikesDisplay.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// react
import { useEffect, useState, useRef } from "react";

// icons
import { GiPunchBlast } from "react-icons/gi";

export default function LikesDisplay({ id, likes }) {
  // init state
  const [realtimeLikes, setRealtimeLikes] = useState(likes);

  // init suabase client
  const supabase = createClientComponentClient();

  console.log(realtimeLikes.length);

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
          console.log(id, payload.new.workout_id);
          if (payload.new.workout_id === idRef.current) {
            setRealtimeLikes((prevLikes) => [...prevLikes, payload.new]);
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
      {realtimeLikes.length}
      <GiPunchBlast size={20} />
    </div>
  );
}
