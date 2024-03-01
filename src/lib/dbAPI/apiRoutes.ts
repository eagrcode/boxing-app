export const apiRoutes = {
  getUser: "/auth/v1/user",
  getTotalCompletedWorkouts: (id: string) =>
    `/rest/v1/data_set_user_completed_workouts?select=created_at&user_id=eq.${id}`,
  getTotalCompletedRounds: (id: string) =>
    `/rest/v1/completed_rounds?select=rounds&user_id=eq.${id}`,
  getTotalCompletedTime: (id: string) => `/rest/v1/completed_time?select=time&user_id=eq.${id}`,
  getGraphData: (query: string) =>
    `/rest/v1/rpc/${query ? query : "get_completed_workouts_6_months"}`,
  getWorkouts: `/rest/v1/rpc/get_all_workouts_with_user_details`,
  getWorkoutByID: `/rest/v1/rpc/get_workout_by_id`,
  getUserWorkouts: `/rest/v1/rpc/get_user_workouts`,
};
