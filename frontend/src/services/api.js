import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Get all pets
export const getPets = () => axios.get(`${API_URL}/pets`);

// Request adoption
export const requestAdoption = (petId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) throw new Error("User not logged in");

  return axios.post(`${API_URL}/adoptions`, { petId, userId: user.id });
};


/*
// Request adoption
export const requestAdoption = (petId, userId = 1) =>
  axios.post(`${API_URL}/adoptions/${userId}/${petId}`);

*/