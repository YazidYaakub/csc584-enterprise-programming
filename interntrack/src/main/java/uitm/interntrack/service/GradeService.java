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
}
