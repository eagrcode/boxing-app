import ComboCard from "@/src/components/shared/ComboCard/ComboCard";
import GenerateComboForm from "@/src/components/forms/GenerateComboForm/GenerateComboForm";
import styles from "../page.module.scss";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  randomCombo: string[];
  setRandomCombo: Dispatch<SetStateAction<string[]>>;
  handleViewChange: (e: any) => void;
};

export default function ComboView({ randomCombo, setRandomCombo, handleViewChange }: PropTypes) {
  return (
    <>
      <h1>Select difficulty</h1>
      <div className={styles.formCardContainer}>
        <GenerateComboForm setRandomCombo={setRandomCombo} />
        {randomCombo?.length === 0 ? (
          <div className={styles.comboSkeleton}></div>
        ) : (
          <ComboCard sequence={randomCombo} />
        )}
        <button id="form-view" disabled={!randomCombo.length} onClick={(e) => handleViewChange(e)}>
          Next
        </button>
      </div>
    </>
  );
}
