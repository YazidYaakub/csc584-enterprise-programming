package uitm.interntrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Grade;
import uitm.interntrack.service.GradeService;

@RestController
@RequestMapping("/api/grade")
@CrossOrigin(origins = "*")
public class GradeController {

  private final GradeService gradeService;

  public GradeController(GradeService gradeService) {
    this.gradeService = gradeService;
  }

  @PostMapping("/create")
  public ResponseEntity<Grade> createGrade(@RequestBody Grade grade) {
    var savedGrade = gradeService.createGrade(grade);
    return ResponseEntity.ok(savedGrade);
  }
}