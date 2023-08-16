// styles
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Boxing App</h1>
      <p>{"Generate random combo's, or select a workout from the workouts feed!"}</p>
    </div>
  );
};

export default Hero;
