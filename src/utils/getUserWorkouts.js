const getUserWorkouts = async (id) => {
  try {
    const res = await fetch(`http://192.168.0.27:3000/api/userWorkouts/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getUserWorkouts;
