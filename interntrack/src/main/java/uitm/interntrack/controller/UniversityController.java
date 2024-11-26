package uitm.interntrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.University;
import uitm.interntrack.service.UniversityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/university")
@CrossOrigin(origins = "*")
public class UniversityController {

  private final UniversityService universityService;
  private final Logger logger = LoggerFactory.getLogger(UniversityController.class);

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @PostMapping("/create")
  public ResponseEntity<University> registerUniversity(@RequestBody University university) {
    System.out.println("received university: " + university);
    University savedUniversity = universityService.createUniversity(university);
    logger.info("University registered: {}", savedUniversity);
    return ResponseEntity.ok(savedUniversity);
  }

  @GetMapping("/")
  public ResponseEntity<List<University>> getAllUniversities() {
    List<University> universities = universityService.getAllUniversities();
    logger.info("Universities retrieved: {}", universities);
    return ResponseEntity.ok(universities);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUniversity(@PathVariable Long id) {
    universityService.deleteUniversity(id);
    logger.info("University deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<University> updateUniversity(@PathVariable Long id, @RequestBody University university) {
    University updatedUniversity = universityService.updateUniversity(id, university);
    logger.info("University updated: {}", updatedUniversity);
    return ResponseEntity.ok(updatedUniversity);
  }
}
