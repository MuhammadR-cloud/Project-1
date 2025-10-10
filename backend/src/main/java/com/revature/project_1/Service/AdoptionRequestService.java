package com.revature.project_1.Service;

import com.revature.project_1.Entity.AdoptionRequest;
import com.revature.project_1.Entity.Pet;
import com.revature.project_1.Entity.User;
import com.revature.project_1.Repository.AdoptionRequestRepository;
import com.revature.project_1.Repository.PetRepository;
import com.revature.project_1.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdoptionRequestService {

    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    // Create a new adoption request
    public AdoptionRequest createRequest(Long userId, Long petId) {
        User user = userRepository.findById(userId).orElseThrow();
        Pet pet = petRepository.findById(petId).orElseThrow();

        pet.setStatus("PENDING");
        petRepository.save(pet);

        AdoptionRequest request = new AdoptionRequest();
        request.setUser(user);
        request.setPet(pet);
        request.setStatus("PENDING");

        return adoptionRequestRepository.save(request);
    }

    // Get all adoption requests
    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestRepository.findAll();
    }

    // Approve adoption request
    public String approveRequest(Long id) {
        AdoptionRequest request = adoptionRequestRepository.findById(id).orElseThrow();
        request.setStatus("APPROVED");

        Pet pet = request.getPet();
        pet.setStatus("ADOPTED");
        petRepository.save(pet);

        adoptionRequestRepository.save(request);
        return "Adoption request approved!";
    }

    
    // Deny adoption request
public String denyRequest(Long id) {
    AdoptionRequest request = adoptionRequestRepository.findById(id).orElseThrow();
    request.setStatus("DENIED");

    Pet pet = request.getPet();
    pet.setStatus("AVAILABLE"); // reset pet to available if request denied
    petRepository.save(pet);

    adoptionRequestRepository.save(request);
    return "Adoption request denied!";
}


    // ✅ Get only pending requests
    public List<AdoptionRequest> getPendingRequests() {
        return adoptionRequestRepository.findByStatus("PENDING");
    }
}

