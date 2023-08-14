const getWorkouts = async () => {
  try {
    const res = await fetch("http://192.168.0.27:3000/api/workouts");
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export default getWorkouts;
