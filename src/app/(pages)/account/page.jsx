// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import CreateWorkoutForm from "./components/CreateWorkoutForm/CreateWorkoutForm";
import WorkoutCard from "@/src/components/WorkoutCard/WorkoutCard";

// utils
import getUserWorkouts from "@/src/utils/getUserWorkouts";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  if (!session) {
    redirect("/login");
  }

  // get workouts
  const userWorkouts = await getUserWorkouts(user.id);

  return (
    <>
      <h1>Account</h1>
      <p>Email address: {user.email}</p>
      <p>My Workouts:</p>
      {userWorkouts && (
        <ul>
          {userWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              id={workout.id}
              title={workout.title}
              workoutRounds={workout.number_of_rounds}
              workoutRoundTime={workout.round_time}
            />
          ))}
        </ul>
      )}
      <p>Create workout</p>
      <CreateWorkoutForm userID={user.id} />
    </>
  );
};

export default page;
