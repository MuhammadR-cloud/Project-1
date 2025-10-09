import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestAdoption } from "../services/api";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets(); // initial fetch

    const interval = setInterval(fetchPets, 3000); // live updates
    return () => clearInterval(interval);
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets");

      setPets(
        response.data.map((p) => ({
          ...p,
          status: p.status.toLowerCase(), // normalize
        }))
      );
    } catch (err) {
      console.error("Error fetching pets", err);
      alert("Error fetching pets");
    }
  };

  const handleAdopt = async (petId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser.id) {
        alert("❌ You must be logged in to adopt a pet.");
        return;
      }
      const userId = storedUser.id;

      await requestAdoption(petId, userId); // send userId
      alert("Adoption request sent!");
      fetchPets(); // refresh immediately
    } catch (error) {
      console.error("Error sending adoption request", error);
      alert("Error while sending adoption request");
    }
  };

  return (
    <div>
      <h2>Pets</h2>
      <div className="pet-list">
        {pets.length === 0 ? (
          <p>No pets found.</p>
        ) : (
          pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onAdopt={handleAdopt} />
          ))
        )}
      </div>
    </div>
  );
}

export default PetList;
