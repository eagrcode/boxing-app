"use client";

// styles
import styles from "./UserWorkout.module.scss";

// supabase client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { useRouter } from "next/navigation";

export default function UserWorkout({
  id,
  title,
  numberOfRounds,
  roundTime,
  restTime,
  warmupTime,
  roundInfo,
  workoutData,
}) {
  console.log(workoutData);

  const router = useRouter();

  // supabase client
  const supabase = createClientComponentClient();

  const handleDeleteWorkout = async (id) => {
    try {
      const { error } = await supabase.from("workouts").delete().eq("id", id);
      if (error) {
        console.error("Supabase error:", error.message);
        return; // Exit early if there's an error
      }
      router.push("/account");
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <div className={styles.container}>
        <h2>Info</h2>
        <div>
          <p>Total {numberOfRounds * roundTime} min</p>
          <p>{numberOfRounds} rounds</p>
          <p>{warmupTime} sec / warmup</p>
          <p>{roundTime} min / round</p>
          <p>{restTime} sec / rest</p>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Combos</h2>
        {roundInfo.map((round, index) => (
          <div key={index}>
            <p>
              Round {round.round} - {round.sequence.map((seq) => `${seq} `)}
            </p>
          </div>
        ))}
      </div>
      <div>
        <button>Edit</button>
        <button onClick={() => handleDeleteWorkout(id)}>Delete</button>
      </div>
      <button className={styles.startBtn}>Start</button>
    </div>
  );
}
