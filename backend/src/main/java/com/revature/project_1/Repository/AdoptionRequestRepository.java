package com.revature.project_1.Repository;

import com.revature.project_1.Entity.AdoptionRequest;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByStatus(String status);
}
