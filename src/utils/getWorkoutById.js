const getWorkoutById = async (id) => {
  try {
    const res = await fetch(`${location.origin}/api/workouts/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getWorkoutById;
