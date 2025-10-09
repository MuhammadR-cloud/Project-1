package com.revature.project_1.Controller;
import com.revature.project_1.Entity.AdoptionRequest;
import com.revature.project_1.Service.AdoptionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "http://localhost:3000")
public class AdoptionController {    
@Autowired
private AdoptionRequestService adoptionRequestService;

    // Create a new adoption request
     @PostMapping
    public AdoptionRequest createAdoption(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long petId = request.get("petId");

        if (userId == null || petId == null) {
            throw new RuntimeException("userId and petId are required");
        }

        return adoptionRequestService.createRequest(userId, petId);
    }


    // Get all adoption requests
    @GetMapping
    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestService.getAllRequests();
    }

    // Approve an adoption request
    @PutMapping("/{id}/approve")
    public String approveRequest(@PathVariable Long id) {
        return adoptionRequestService.approveRequest(id);
    }

    // Deny an adoption request
    @PutMapping("/{id}/deny")
    public String denyRequest(@PathVariable Long id) {
        return adoptionRequestService.denyRequest(id);
    }

    // Get only pending requests
    @GetMapping("/pending")
    public List<AdoptionRequest> getPendingRequests() {
        return adoptionRequestService.getPendingRequests();
    }
}

