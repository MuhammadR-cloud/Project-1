package com.revature.project_1.Repository;
import com.revature.project_1.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByStatus(String status);
}
