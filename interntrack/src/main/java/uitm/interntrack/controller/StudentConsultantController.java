package uitm.interntrack.controller;

import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.StudentConsultant;
import uitm.interntrack.service.StudentConsultantService;

import java.util.List;

@RestController
@RequestMapping("/api/student-consultants")
@CrossOrigin(origins = "*")
public class StudentConsultantController {

    private final StudentConsultantService service;

    public StudentConsultantController(StudentConsultantService service) {
        this.service = service;
    }

    // Endpoint to get students by userId
    @GetMapping("/students/{userId}")
    public List<StudentConsultant> getStudentByUserId(@PathVariable String userId) {
        return service.getStudentByUserId(userId);
    }

    // Endpoint to get advisors by userId
    @GetMapping("/advisors/{userId}")
    public List<StudentConsultant> getAdvisorByUserId(@PathVariable String userId) {
        return service.getAdvisorByUserId(userId);
    }

    // Endpoint to get supervisors by userId
    @GetMapping("/supervisors/{userId}")
    public List<StudentConsultant> getSupervisorByUserId(@PathVariable String userId) {
        return service.getSupervisorByUserId(userId);
    }

    // Endpoint to create student consultant
    @PostMapping
    public StudentConsultant createStudentConsultant(
            @RequestParam String studentId,
            @RequestParam String advisorId,
            @RequestParam String supervisorId) {
        return service.createStudentConsultant(studentId, advisorId, supervisorId);
    }

    @PutMapping("/{id}")
    public void modifyStudentConsultant(
            @PathVariable String id,
            @RequestParam String studentId,
            @RequestParam String advisorId,
            @RequestParam String supervisorId) {
        // Call the service to perform the modification
        service.modifyStudentConsultant(id, studentId, advisorId, supervisorId);
    }
}
