package uitm.interntrack.entity;

import java.sql.Timestamp;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_consultant_seq_gen")
    @SequenceGenerator(name = "student_consultant_seq_gen", sequenceName = "STUDENT_CONSULTANT_SEQUENCE", allocationSize = 1)
    @Column(name = "STUDENT_CONSULTANT_ID")
    private Long studentConsultantId;

    @Column(name = "STUDENT_ID", insertable = true, updatable = true)
    private Long studentId;

    @Column(name = "ADVISOR_ID", insertable = true, updatable = true)
    private Long advisorId;

    @Column(name = "SUPERVISOR_ID", insertable = true, updatable = true)
    private Long supervisorId;

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

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StudentConsultantDTO {
        private Long studentConsultantId;
        private Long studentId;
        private Long advisorId;
        private Long supervisorId;
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
