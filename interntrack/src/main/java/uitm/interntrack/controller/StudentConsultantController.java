package uitm.interntrack.controller;

import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.StudentConsultant;
import uitm.interntrack.service.StudentConsultantService;

import java.util.List;

@RestController
@RequestMapping("/api/student-consultants")
public class StudentConsultantController {

    private final StudentConsultantService service;

    public StudentConsultantController(StudentConsultantService service) {
        this.service = service;
    }

    // Endpoint to get students by userId
    @GetMapping("/students/{userId}")
    public List<StudentConsultant> getStudentByUserId(@PathVariable Long userId) {
        return service.getStudentByUserId(userId);
    }

    // Endpoint to get advisors by userId
    @GetMapping("/advisors/{userId}")
    public List<StudentConsultant> getAdvisorByUserId(@PathVariable Long userId) {
        return service.getAdvisorByUserId(userId);
    }


    // Endpoint to get supervisors by userId
    @GetMapping("/supervisors/{userId}")
    public List<StudentConsultant> getSupervisorByUserId(@PathVariable Long userId) {
        return service.getSupervisorByUserId(userId);
    }

    // Endpoint to create student consultant
    @PostMapping
    public StudentConsultant createStudentConsultant(
            @RequestParam Long studentId,
            @RequestParam Long advisorId,
            @RequestParam Long supervisorId
    ) {
        return service.createStudentConsultant(studentId, advisorId, supervisorId);
    }
}
