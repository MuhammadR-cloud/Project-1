import React from "react";

function PetCard({ pet, onAdopt }) {
  let buttonText = "Adopt";
  let isDisabled = false;

  if (pet.status === "pending") {
    buttonText = "Pending";
    isDisabled = true;
  } else if (pet.status === "adopted") {
    buttonText = "Adopted";
    isDisabled = true;
  }

  return (
    <div className="pet-card">
      <h3>{pet.name} ({pet.type})</h3>
      <p>Age: {pet.age}</p>
      <p>{pet.description}</p>
      <p>Status: {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}</p>
      <button onClick={() => onAdopt(pet.id)} disabled={isDisabled}>
        {buttonText}
      </button>
    </div>
  );
}

export default PetCard;
