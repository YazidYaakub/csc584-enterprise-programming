package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import uitm.interntrack.entity.Grade;
import uitm.interntrack.repository.GradeRepository;

@Service
public class GradeService {

  private final GradeRepository gradeRepository;

  public GradeService(GradeRepository gradeRepository) {
    this.gradeRepository = gradeRepository;
  }

  public Grade createGrade(Long studentId, Grade grade) {
    gradeRepository.findByStudentIdAndMonth(studentId, grade.getMonth())
        .ifPresent(g -> {
          throw new RuntimeException("Grade already exists for this student and month");
        });

    grade.setStudentId(studentId);
    grade.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    return gradeRepository.save(grade);
  }

  public List<Grade> getGradesByStudentId(Long studentId) {
    return gradeRepository.findByStudentIdOrderByCreatedAtDesc(studentId);
  }

  public void deleteGrade(Long gradeId) {
    gradeRepository.deleteById(gradeId);
  }

  public Grade updateGrade(Long gradeId, Grade grade) {
    Grade existingGrade = gradeRepository.findById(gradeId)
        .orElseThrow(() -> new RuntimeException("Grade not found"));

    existingGrade.setGrade(grade.getGrade());
    existingGrade.setMonth(grade.getMonth());

    return gradeRepository.save(existingGrade);
  }
}
