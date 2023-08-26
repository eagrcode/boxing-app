export default async function getUserSavedWorkouts(id) {
  console.log("fetch ID:", id);

  try {
    const res = await fetch(`http://localhost:3000/api/userSavedWorkouts/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    data && console.log("fetch data: ", data);

    return data;
  } catch (error) {
    console.log(error.message);
  }
}
