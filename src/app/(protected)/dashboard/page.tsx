import styles from "./page.module.scss";
import DataDisplaySmall from "@/src/components/shared/DataDisplaySmall/DataDisplaySmall";
import DataDisplayGraph from "@/src/components/shared/DataDisplayGraph/DataDisplayGraph";
import getUserCompletedWorkouts from "@/src/lib/services/getUserCompletedWorkouts";
import getUserCompletedMins from "@/src/lib/services/getUserCompletedMins";
import getUserCompletedRounds from "@/src/lib/services/getUserCompletedRounds";
import { GiPunchingBag } from "react-icons/gi";
import { GiPunch } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { getSupaUser } from "@/src/lib/utils/getSupaUser";
import get6MonthsData from "@/src/lib/services/get6monthsData";

export default async function Index({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const user = await getSupaUser();

  let userID = "";

  if (user) {
    userID = user.id;
  }

  const [completedWorkouts, completedMins, completedRounds, completedSomethingElse] =
    await Promise.all([
      getUserCompletedWorkouts(userID),
      getUserCompletedMins(userID),
      getUserCompletedRounds(userID),
      0,
    ]);

  const completedSeconds = Math.ceil(completedMins / 60);

  const query = searchParams?.query || "";

  const tiles = [
    {
      id: 1,
      data: completedWorkouts,
      title: "Workouts",
      icon: <GiPunch size={25} />,
      queryParam: "get_completed_workouts",
      isActive: query === "" || query === "get_completed_workouts",
    },
    {
      id: 2,
      data: completedSeconds,
      title: "Minutes",
      icon: <MdTimer size={25} />,
      queryParam: "get_completed_time",
      isActive: query === "get_completed_time",
    },
    {
      id: 3,
      data: completedRounds,
      title: "Rounds",
      icon: <BsFillLightningChargeFill size={25} />,
      queryParam: "get_completed_rounds",
      isActive: query === "get_completed_rounds",
    },
    {
      id: 4,
      data: completedSomethingElse,
      title: "Contributions",
      icon: <GiPunchingBag size={25} />,
      queryParam: "get_monthly_data_4",
      isActive: query === "get_monthly_data_4",
    },
  ];

  const sixMonthsCompletedWorkouts = await get6MonthsData(userID, query);

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
            queryParam={item.queryParam}
            isActive={item.isActive}
            currentQuery={query}
          />
        ))}
      </div>
      <div className={styles.graphWrapper}>
        <DataDisplayGraph
          sixMonthsCompletedWorkouts={sixMonthsCompletedWorkouts}
          currentQuery={query}
        />
      </div>
    </div>
  );
}
