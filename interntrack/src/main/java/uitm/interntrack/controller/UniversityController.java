package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.University;
import uitm.interntrack.service.UniversityService;

@RestController
@RequestMapping("/api/university")
@CrossOrigin(origins = "*")
public class UniversityController {

  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @PostMapping("/create")
  public ResponseEntity<University> registerUniversity(@RequestBody University university) {
    System.out.println("received university: " + university);
    University savedUniversity = universityService.createUniversity(university);
    return ResponseEntity.ok(savedUniversity);
  }

  @GetMapping("/list")
  public ResponseEntity<List<University>> getAllUniversities() {
    List<University> universities = universityService.getAllUniversities();
    return ResponseEntity.ok(universities);
  }

  @GetMapping("/{id}")
  public ResponseEntity<University> getUniversity(@PathVariable Long id) {
    University university = universityService.getUniversityById(id);
    return ResponseEntity.ok(university);
  }

}
