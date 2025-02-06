package uitm.interntrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.Grade;
import uitm.interntrack.service.GradeService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/grade")
@CrossOrigin(origins = "*")
public class GradeController {

  private final GradeService gradeService;

  public GradeController(GradeService gradeService) {
    this.gradeService = gradeService;
  }

  @GetMapping()
  public Grade getStudentGrade(@RequestParam String studentId, @RequestParam String month) {
    return gradeService.getStudentByMonth(studentId, month);
  }

  @PostMapping
  public ResponseEntity<Grade> insertStudentGrade(
      @RequestParam String studentId,
      @RequestParam String month,
      @RequestParam char grade) {
    gradeService.insertStudentGrade(studentId, month, grade);
    return ResponseEntity.ok().build();
  }
}
