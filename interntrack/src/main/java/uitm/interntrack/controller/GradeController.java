package uitm.interntrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Grade;
import uitm.interntrack.service.GradeService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/grade")
@CrossOrigin(origins = "*")
public class GradeController {

  private final GradeService gradeService;
  private final Logger logger = LoggerFactory.getLogger(GradeController.class);

  public GradeController(GradeService gradeService) {
    this.gradeService = gradeService;
  }

  @PostMapping("/create")
  public ResponseEntity<Grade> createGrade(@RequestBody Grade grade) {
    var savedGrade = gradeService.createGrade(grade);
    logger.info("Grade created: {}", savedGrade);
    return ResponseEntity.ok(savedGrade);
  }
  
  @GetMapping("/")
  public ResponseEntity<List<Grade>> getGrades() {
    var grades = gradeService.getGrades();
    logger.info("Grades retrieved: {}", grades);
    return ResponseEntity.ok(grades);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
    gradeService.deleteGrade(id);
    logger.info("Grade deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade grade) {
    Grade updatedGrade = gradeService.updateGrade(id, grade);
    logger.info("Grade updated: {}", updatedGrade);
    return ResponseEntity.ok(updatedGrade);
  }
}
