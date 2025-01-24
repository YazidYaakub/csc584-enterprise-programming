package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, String> {
}
