package Repository;

import Entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRepository extends JpaRepository<AdoptionRequest, Long> {
}
