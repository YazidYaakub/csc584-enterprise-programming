package uitm.interntrack.service;

import org.springframework.stereotype.Service;
import uitm.interntrack.entity.StudentConsultant;
import uitm.interntrack.repository.StudentConsultantRepository;
import java.sql.Timestamp;

import java.util.List;

@Service
public class StudentConsultantService {

    private final StudentConsultantRepository repository;

    public StudentConsultantService(StudentConsultantRepository repository) {
        this.repository = repository;
    }

    public List<StudentConsultant> getStudentByUserId(Long userId) {
        return repository.getStudentByUserId(userId);
    }

    public List<StudentConsultant> getAdvisorByUserId(Long userId) {
        return repository.getAdvisorByUserId(userId);
    }

    public List<StudentConsultant> getSupervisorByUserId(Long userId) {
        return repository.getSupervisorByUserId(userId);
    }

    public StudentConsultant createStudentConsultant(Long studentId, Long advisorId, Long supervisorId) {
        Timestamp assignedAt = new Timestamp(System.currentTimeMillis());

        StudentConsultant studentConsultant = new StudentConsultant(studentId, advisorId, supervisorId, assignedAt);
        return repository.save(studentConsultant);
    }
}
