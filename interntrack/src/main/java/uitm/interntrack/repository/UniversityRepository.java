package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.University;

public interface UniversityRepository extends JpaRepository<University, Long> {
}
