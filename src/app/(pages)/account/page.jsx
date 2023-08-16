// styles
import styles from "./page.module.scss";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import CreateWorkoutForm from "./components/CreateWorkoutForm/CreateWorkoutForm";
import UserWorkoutCard from "./components/UserWorkoutCard/UserWorkoutCard";

// utils
import getUserWorkouts from "@/src/utils/getUserWorkouts";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;
  console.log(user.id);

  if (!session) {
    redirect("/login");
  }

  // get workouts
  const userWorkouts = await getUserWorkouts(user.id);

  return (
    <>
      <p>Hello!, {user.email}</p>
      {/* <p>{`My Workouts (${userWorkouts.length})`}</p> */}
      {userWorkouts && (
        <ul>
          {userWorkouts.map((workout) => (
            <UserWorkoutCard
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
