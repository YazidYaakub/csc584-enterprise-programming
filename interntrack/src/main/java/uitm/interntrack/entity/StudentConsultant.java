package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "STUDENT_CONSULTANTS", schema = "INTERNTRACK")
public class StudentConsultant {

    // @Id
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    // private Long userId;
    

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "STUDENT_CONSULTANT_SEQUENCE", allocationSize = 1)
    @Column(name = "STUDENT_CONSULTANT_ID")
    
    private Long studentConsultantId;

    @Column(name = "STUDENT_ID")
    private Long studentId;

    @Column(name = "ADVISOR_ID")
    private Long advisorId;

    @Column(name = "SUPERVISOR_ID")
    private Long supervisorId;

    @Column(name = "ASSIGNED_AT")
    private Timestamp assignedAt;
    
    // private Long studentId;
    // private Long advisorId;
    // private Long supervisorId;
    // private Timestamp assignedAt;

    public StudentConsultant() {
    }

    public StudentConsultant(Long studentId, Long advisorId, Long supervisorId, Timestamp assignedAt) {
        this.studentId = studentId;
        this.advisorId = advisorId;
        this.supervisorId = supervisorId;
        this.assignedAt = assignedAt;
    }

    @PrePersist
    protected void onCreate() {
        if (assignedAt == null) {
            assignedAt = new Timestamp(System.currentTimeMillis());
        }
    }

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

    public Timestamp getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(Timestamp assignedAt) {
        this.assignedAt = assignedAt;
    }
}
