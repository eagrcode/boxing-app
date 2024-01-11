import styles from "./page.module.scss";
import DataDisplaySmall from "@/src/components/shared/DataDisplaySmall/DataDisplaySmall";
import DataDisplayGraph from "@/src/components/shared/DataDisplayGraph/DataDisplayGraph";
import { GiPunchingBag } from "react-icons/gi";
import { GiPunch } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { getTotalCompletedWorkouts } from "@/src/lib/services/dashboard/getTotalCompletedWorkouts";
import { apiRoutes } from "@/src/lib/dbAPI/apiRoutes";
import { getGraphData } from "@/src/lib/services/dashboard/getGraphData";
import { getUser } from "@/src/lib/services/user/getUser";
import { getTotalCompletedTime } from "@/src/lib/services/dashboard/getTotalCompletedTime";
import { getTotalCompletedRounds } from "@/src/lib/services/dashboard/getTotalCompletedRounds";
import { getAverageWorkoutLength } from "@/src/lib/services/dashboard/getAverageWorkoutLength";

export default async function Index({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const user = await getUser();
  const query = searchParams?.query || "";

  const [
    cachedTotalCompletedWorkouts,
    cachedTotalCompletedTime,
    cachedTotalCompletedRounds,
    cachedAverageWorkoutLength,
  ] = await Promise.all([
    getTotalCompletedWorkouts(apiRoutes.getTotalCompletedWorkouts(user.id)),
    getTotalCompletedTime(apiRoutes.getTotalCompletedTime(user.id)),
    getTotalCompletedRounds(apiRoutes.getTotalCompletedRounds(user.id)),
    getAverageWorkoutLength(apiRoutes.getTotalCompletedTime(user.id)),
  ]);

  const sixMonthsData = await getGraphData(apiRoutes.getGraphData(query), user.id);

  const tiles = [
    {
      id: 1,
      data: cachedTotalCompletedWorkouts,
      title: "Workouts",
      icon: <GiPunch size={25} />,
      text: "completed",
      queryParam: "get_completed_workouts",
      isActive: query === "" || query === "get_completed_workouts",
    },
    {
      id: 2,
      data: cachedTotalCompletedTime,
      title: "Bag Time",
      icon: <MdTimer size={25} />,
      text: "mins",
      queryParam: "get_completed_time",
      isActive: query === "get_completed_time",
    },
    {
      id: 3,
      data: cachedTotalCompletedRounds,
      title: "Rounds",
      icon: <BsFillLightningChargeFill size={25} />,
      text: "completed",
      queryParam: "get_completed_rounds",
      isActive: query === "get_completed_rounds",
    },
    {
      id: 4,
      data: cachedAverageWorkoutLength,
      title: "Avg Workout",
      icon: <GiPunchingBag size={25} />,
      text: "mins",
      queryParam: "get_average_workout",
      isActive: query === "get_average_workout",
    },
  ];

  return (
    <div className={styles.pageWrapperUser}>
      <div className={styles.dataDisplayGrid}>
        {tiles.map((item, index) => (
          <DataDisplaySmall
            key={index}
            index={index}
            data={item.data}
            title={item.title}
            icon={item.icon}
            text={item.text}
            queryParam={item.queryParam}
            isActive={item.isActive}
            currentQuery={query}
          />
        ))}
      </div>
      <div className={styles.graphWrapper}>
        <DataDisplayGraph sixMonthsData={sixMonthsData} currentQuery={query} />
      </div>
    </div>
  );
}
