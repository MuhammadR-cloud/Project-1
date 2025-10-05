import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestAdoption } from "../services/api";
import PetCard from "./PetCard";

function PetList() {
  const [pets, setPets] = useState([]); // store pets data

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets"); // fetch all pets
      setPets(response.data);
    } catch (err) {
      alert("Error fetching pets");
    }
  };

  const handleAdopt = async (petId) => {
    try {
      await requestAdoption(petId, 1); // userId = 1
      alert("Adoption request sent!");
      fetchPets(); // refresh list to show updated status
    } catch (error) {
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
