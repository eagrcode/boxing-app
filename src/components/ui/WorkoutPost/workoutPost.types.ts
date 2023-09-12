export interface WorkoutPostPropTypes {
  variant: string;
  id: string;
  userID: string;
  title: string;
  description: string;
  workoutRounds: number;
  workoutWarmupTime: number;
  workoutRoundTime: number;
  workoutRestTime: number;
  createdAt: string;
  createdBy: string;
}
