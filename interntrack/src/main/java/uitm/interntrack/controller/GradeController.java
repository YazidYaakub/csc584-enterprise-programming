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
  public ResponseEntity<Grade> createGrade(@RequestParam Long studentId, @RequestBody Grade grade) {
      var savedGrade = gradeService.createGrade(studentId, grade);
      logger.info("Grade created for student {}: {}", studentId, savedGrade);
      return ResponseEntity.ok(savedGrade);
  }
  
  @GetMapping("/student/{studentId}")
  public ResponseEntity<List<Grade>> getGradesByStudentId(@PathVariable Long studentId) {
      var grades = gradeService.getGradesByStudentId(studentId);
      logger.info("Grades retrieved for student {}: {}", studentId, grades);
      return ResponseEntity.ok(grades);
  }

  @DeleteMapping("/{gradeId}")
  public ResponseEntity<Void> deleteGrade(@PathVariable Long gradeId) {
      gradeService.deleteGrade(gradeId);
      logger.info("Grade deleted: {}", gradeId);
      return ResponseEntity.noContent().build();
  }

  @PutMapping("/{gradeId}")
  public ResponseEntity<Grade> updateGrade(@PathVariable Long gradeId, @RequestBody Grade grade) {
      Grade updatedGrade = gradeService.updateGrade(gradeId, grade);
      logger.info("Grade updated: {}", updatedGrade);
      return ResponseEntity.ok(updatedGrade);
  }
}