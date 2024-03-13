type Round = {
  round: number;
  sequence: string[];
};

type WorkoutData = {
  id: string;
  created_at: string;
  number_of_rounds: number;
  round_info: Round[];
  round_time: number;
  rest_time: number;
  warmup_time: number;
  title: string;
  user_id: string;
  is_public: boolean;
  description: string;
  plays: number;
  created_by: string;
};

type ProfilesData = {
  id: string;
  updated_at: string | null;
  email: string;
  full_name: string;
  created_at: string;
  username: string;
  avatar_url: string;
};

export type Workout = {
  workout_id: string;
  workout_data: WorkoutData;
  profiles_data: ProfilesData;
  likes_count: number;
  saves_count: number;
  is_liked: boolean;
  is_saved: boolean;
};

export type WorkoutPost = {
  index: number;
  selectedIndex: number;
  id: string;
  title: string;
  description: string;
  workoutRounds: number;
  workoutWarmupTime: number;
  workoutRoundTime: number;
  workoutRestTime: number;
  createdAt: string;
  createdBy: string;
  avatarURL: string;
  plays: number;
  name: string;
  isSaved: boolean;
  isLiked: boolean;
  savesCount: number;
  likesCount: number;
  authorID: string;
};
