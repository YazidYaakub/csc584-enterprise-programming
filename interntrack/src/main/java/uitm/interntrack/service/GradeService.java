package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.Grade;
import uitm.interntrack.repository.GradeRepository;

@Service
public class GradeService {

  private final GradeRepository gradeRepository;

  public GradeService(GradeRepository gradeRepository) {
    this.gradeRepository = gradeRepository;
  }

  public Grade createGrade(Grade grade) {
    return gradeRepository.save(grade);
  }

  public List<Grade> getGrades() {
    return gradeRepository.findAll();
  }

  public Grade getStudentByMonth(String studentId, String month) {
    return gradeRepository.getStudentByMonth(studentId, month);
  }

  public Grade insertStudentGrade(String studentId, String month, char grading) {
    Grade grade = Grade.builder()
        .grading(grading)
        .month(month)
        .studentId(studentId)
        .build();

    return gradeRepository.save(grade);
  }
}
