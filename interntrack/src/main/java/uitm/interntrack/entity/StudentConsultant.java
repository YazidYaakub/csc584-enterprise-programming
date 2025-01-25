package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "STUDENT_CONSULTANTS", schema = "INTERNTRACK")
public class StudentConsultant {


    @Id
    @Column(name = "STUDENT_CONSULTANT_ID", columnDefinition = "VARCHAR(36)")
    private String studentConsultantId;

    private String studentId;
    private String advisorId;
    private String supervisorId;
    private Timestamp assignedAt;

    @PrePersist
    protected void onCreate() {
        if (this.studentConsultantId == null) {
            this.studentConsultantId = UUID.randomUUID().toString();
        }
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getAdvisorId() {
        return advisorId;
    }

    public void setAdvisorId(String advisorId) {
        this.advisorId = advisorId;
    }

    public String getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(String supervisorId) {
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
