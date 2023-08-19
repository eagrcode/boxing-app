const getWorkouts = async () => {
  try {
    const res = await fetch(`${location.origin}/api/workouts`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error.message}`);
  }
};

export default getWorkouts;
