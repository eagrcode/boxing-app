import styles from "../page.module.scss";

type PropTypes = {
  handleViewChange: (e: any) => void;
};

export default function ModeView({ handleViewChange }: PropTypes) {
  return (
    <>
      <h1>Mode</h1>
      <button className={styles.modeBtn} id="combo-view" onClick={(e) => handleViewChange(e)}>
        TABATA - ACG
      </button>
      <button className={styles.modeBtn} id="form-view" onClick={(e) => handleViewChange(e)}>
        TABATA
      </button>
    </>
  );
}
