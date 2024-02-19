import styles from "../page.module.scss";

type PropTypes = {
  handleViewChange: (e: any) => void;
};

export default function ModeView({ handleViewChange }: PropTypes) {
  return (
    <div className={styles.wrapper}>
      <h1>Select Mode</h1>
      <div id="combo-view" onClick={(e) => handleViewChange(e)}>
        ACG
      </div>
      <div id="form-view" onClick={(e) => handleViewChange(e)}>
        Default
      </div>
    </div>
  );
}
