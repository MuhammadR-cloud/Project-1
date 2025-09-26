package Controller;

import Entity.Pet;
import Service.PetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return petService.savePet(pet);
    }

    @GetMapping("/available")
    public List<Pet> getAvailablePets() {
        return petService.getAvailablePets();
    }
}
