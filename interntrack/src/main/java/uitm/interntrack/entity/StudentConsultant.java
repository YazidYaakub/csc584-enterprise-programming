package uitm.interntrack.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "student_consultants")
public class StudentConsultant {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long studentId;
    private long advisorId;
    private long supervisorId;
    private Timestamp assignedAt;
}
