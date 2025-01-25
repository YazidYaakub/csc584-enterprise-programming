package uitm.interntrack.entity;

import java.sql.Timestamp;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "STUDENT_CONSULTANTS", schema = "INTERNTRACK")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentConsultant {

    @Id
    @Column(name = "STUDENT_CONSULTANT_ID", columnDefinition = "VARCHAR(36)")
    private String studentConsultantId;

    @Column(name = "STUDENT_ID", insertable = true, updatable = true)
    private String studentId;

    @Column(name = "ADVISOR_ID", insertable = true, updatable = true)
    private String advisorId;

    @Column(name = "SUPERVISOR_ID", insertable = true, updatable = true)
    private String supervisorId;

    @CreationTimestamp
    @Column(name = "ASSIGNED_AT", nullable = false, updatable = true)
    private Timestamp assignedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "STUDENT_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ADVISOR_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
    private User advisor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SUPERVISOR_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
    private User supervisor;

    public StudentConsultant(String studentId, String advisorId, String supervisorId, Timestamp assignedAt) {
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
        if (this.studentConsultantId == null) {
            this.studentConsultantId = UUID.randomUUID().toString();
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StudentConsultantDTO {
        private String studentConsultantId;
        private String studentId;
        private String advisorId;
        private String supervisorId;
        private Timestamp assignedAt;
        private User.UserDTO student;
        private User.UserDTO advisor;
        private User.UserDTO supervisor;

        public StudentConsultantDTO(StudentConsultant studentConsultant) {
            this.studentConsultantId = studentConsultant.getStudentConsultantId();
            this.studentId = studentConsultant.getStudentId();
            this.advisorId = studentConsultant.getAdvisorId();
            this.supervisorId = studentConsultant.getSupervisorId();
            this.assignedAt = studentConsultant.getAssignedAt();
            this.student = studentConsultant.getStudent() != null 
                ? new User.UserDTO(studentConsultant.getStudent()) 
                : null;
            this.advisor = studentConsultant.getAdvisor() != null 
                ? new User.UserDTO(studentConsultant.getAdvisor()) 
                : null;
            this.supervisor = studentConsultant.getSupervisor() != null 
                ? new User.UserDTO(studentConsultant.getSupervisor()) 
                : null;
        }
    }
}
