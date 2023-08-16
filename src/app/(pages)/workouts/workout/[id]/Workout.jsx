"use client";

// next
import { useRouter } from "next/navigation";

const Workout = ({ title, rounds, roundTime, restTime, warmupTime, data }) => {
  // init router
  const router = useRouter();

  console.log(data.profiles.email);

  // handle workout timer start
  // const handleStart = () => {
  //   setSelectedWorkout(data);
  //   setWorkoutRounds(rounds.length);
  //   setWorkoutRoundTime(roundTime);
  //   setWorkoutRestTime(restTime);
  //   setWorkoutWarmupTime(warmupTime);
  //   setIsWorkoutMode(true);
  //   router.push("/workouts");
  // };

  return (
    <div>
      <h1>{title}</h1>
      <p>{rounds}</p>
      <p>This is a workout description!</p>

      <button>Start</button>
    </div>
  );
};

export default Workout;
