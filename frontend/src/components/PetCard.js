import React from 'react';

function PetCard({ pet, onAdopt }) {
  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
      <p>Status: {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}</p> {/* Capitalize status */}
      <p>Description: {pet.description}</p>

      <button
        onClick={() => onAdopt(pet.id)}
        disabled={pet.status !== "available"} // only clickable if available
      >
        Adopt
      </button>
    </div>
  );
}

export default PetCard;
