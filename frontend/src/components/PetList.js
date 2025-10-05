import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestAdoption } from "../services/api";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets(); // initial fetch

    // Poll every 3 seconds for live updates after admin action
    const interval = setInterval(fetchPets, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets"); // fetch all pets
      // normalize status to lowercase for button logic
      setPets(response.data.map(p => ({
        ...p,
        status: p.status.toLowerCase()
      })));
    } catch (err) {
      console.error("Error fetching pets", err);
      alert("Error fetching pets");
    }
  };

  const handleAdopt = async (petId) => {
    try {
      await requestAdoption(petId, 1); // userId = 1
      alert("Adoption request sent!");
      fetchPets(); // refresh immediately to show pending status
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
