const getWorkouts = async () => {
  try {
    const res = await fetch("http://192.168.0.27:3000/api/workouts");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error.message}`);
  }
};

export default getWorkouts;
