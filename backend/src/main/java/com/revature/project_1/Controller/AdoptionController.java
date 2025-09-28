package com.revature.project_1.Controller;

import com.revature.project_1.Entity.AdoptionRequest;
import com.revature.project_1.Entity.Pet;
import com.revature.project_1.Entity.User;
import com.revature.project_1.Repository.AdoptionRequestRepository;
import com.revature.project_1.Repository.PetRepository;
import com.revature.project_1.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
public class AdoptionController {

    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    // ✅ Create a new adoption request
    @PostMapping
    public AdoptionRequest createRequest(@RequestParam Long userId, @RequestParam Long petId) {
        User user = userRepository.findById(userId).orElseThrow();
        Pet pet = petRepository.findById(petId).orElseThrow();

        AdoptionRequest request = new AdoptionRequest();
        request.setUser(user);
        request.setPet(pet);
        request.setStatus("PENDING");

        return adoptionRequestRepository.save(request);
    }

    // ✅ Get all adoption requests
    @GetMapping
    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestRepository.findAll();
    }

    // ✅ Approve adoption
    @PutMapping("/{id}/approve")
    public String approveRequest(@PathVariable Long id) {
        AdoptionRequest request = adoptionRequestRepository.findById(id).orElseThrow();
        request.setStatus("APPROVED");

        Pet pet = request.getPet();
        pet.setStatus("ADOPTED");
        petRepository.save(pet);

        adoptionRequestRepository.save(request);
        return "Adoption request approved!";
    }

    // ✅ Deny adoption
    @PutMapping("/{id}/deny")
    public String denyRequest(@PathVariable Long id) {
        AdoptionRequest request = adoptionRequestRepository.findById(id).orElseThrow();
        request.setStatus("DENIED");

        adoptionRequestRepository.save(request);
        return "Adoption request denied!";
    }

    // ✅ Get only pending requests
    @GetMapping("/pending")
    public List<AdoptionRequest> getPendingRequests() {
        return adoptionRequestRepository.findByStatus("PENDING");
    }
}

