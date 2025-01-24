package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "STUDENT_CONSULTANTS")
public class StudentConsultant {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "STUDENT_CONSULTANT_ID", columnDefinition = "VARCHAR(36)")
    private String studentConsultantId;

    private Long studentId;
    private Long advisorId;
    private Long supervisorId;
    private Timestamp assignedAt;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getAdvisorId() {
        return advisorId;
    }

    public void setAdvisorId(Long advisorId) {
        this.advisorId = advisorId;
    }

    public Long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(Long supervisorId) {
        this.supervisorId = supervisorId;
    }

    public String getStudentConsultantId() {
        return studentConsultantId;
    }

    public void setStudentConsultantId(String studentConsultantId) {
        this.studentConsultantId = studentConsultantId;
    }

    public Timestamp getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(Timestamp assignedAt) {
        this.assignedAt = assignedAt;
    }
}
