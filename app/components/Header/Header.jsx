"use client";

// styles
import styles from "./Header.module.scss";

// next
import { usePathname } from "next/navigation";

// context
import { useWorkoutMode } from "@/context/useWorkoutMode";

const Header = () => {
  // destructure context
  const { selectedWorkout } = useWorkoutMode();

  console.log(selectedWorkout.title);

  const pathname = usePathname();
  const currentPath = pathname;

  console.log(pathname);

  // Function to transform the pathname
  const transformPath = (path) => {
    switch (path) {
      case "/":
        return "Home";
      case "/fight":
        return "Timer";
      case "/workouts":
        return "Workouts";
    }
  };

  const transformedPath = transformPath(currentPath);

  return <header className={styles.header}>{transformedPath}</header>;
};

export default Header;
