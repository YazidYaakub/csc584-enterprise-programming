package uitm.interntrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.University;
import uitm.interntrack.service.UniversityService;

import java.util.List;

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

  @GetMapping("/")
  public ResponseEntity<List<University>> getAllUniversities() {
    List<University> universities = universityService.getAllUniversities();
    return ResponseEntity.ok(universities);
  }

}
