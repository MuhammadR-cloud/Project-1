package com.revature.project_1.Service;

import com.revature.project_1.Entity.Pet;
import com.revature.project_1.Repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public List<Pet> getAvailablePets() {
        return petRepository.findByStatus("available");
    }
}
