package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import uitm.interntrack.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentId(Long studentId);
    List<Grade> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    Optional<Grade> findByStudentIdAndMonth(Long studentId, String month);
}