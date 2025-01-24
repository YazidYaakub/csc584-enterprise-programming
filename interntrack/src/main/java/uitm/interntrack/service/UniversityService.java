package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.University;
import uitm.interntrack.repository.UniversityRepository;

@Service
public class UniversityService {

  private final UniversityRepository universityRepository;

  public UniversityService(UniversityRepository universityRepository) {
    this.universityRepository = universityRepository;
  }

  public University createUniversity(University university) {
    return universityRepository.save(university);
  }

  public List<University> getAllUniversities() {
    return universityRepository.findAll();
  }

  public University getUniversityById(Long id) {
    return universityRepository.findById(id).orElse(null);
  }
}
