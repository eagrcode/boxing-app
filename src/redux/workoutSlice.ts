// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutState {
  isActive: boolean;
}

const initialState: WorkoutState = {
  isActive: false,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setIsActive: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { setIsActive } = workoutSlice.actions;

export default workoutSlice.reducer;
