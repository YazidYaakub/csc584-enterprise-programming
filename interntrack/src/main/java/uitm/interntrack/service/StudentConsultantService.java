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

    public List<StudentConsultant> getStudentByUserId(String userId) {
        return repository.getStudentByUserId(userId);
    }

    public List<StudentConsultant> getAdvisorByUserId(String userId) {
        return repository.getAdvisorByUserId(userId);
    }

    public List<StudentConsultant> getSupervisorByUserId(String userId) {
        return repository.getSupervisorByUserId(userId);
    }

    public StudentConsultant createStudentConsultant(String studentId, String advisorId, String supervisorId) {
        // Create a new StudentConsultant object with the provided data
        StudentConsultant studentConsultant = StudentConsultant.builder()
                .studentId(studentId)
                .advisorId(advisorId)
                .supervisorId(supervisorId)
                .assignedAt(new Timestamp(System.currentTimeMillis())) // Auto-generate the assigned date
                .build();
    
        // Save the StudentConsultant entity to the database
        return repository.save(studentConsultant);
    }
    

    public void modifyStudentConsultant(String id, String studentId, String advisorId, String supervisorId) {
        // Update the assignedAt timestamp to the current time
        Timestamp assignedAt = new Timestamp(System.currentTimeMillis());

        // Use the repository's update method
        repository.updateStudentConsultant(id, studentId, advisorId, supervisorId, assignedAt);
    }
}
