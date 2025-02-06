package uitm.interntrack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "GRADES", schema = "INTERNTRACK")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grade {

    @Id
    @Column(name = "GRADES_ID", columnDefinition = "VARCHAR(36)")
    private String gradesId;

    @Column(name = "STUDENT_ID", insertable = true, updatable = true)
    private String studentId;

    @Column(name = "MONTH", insertable = true, updatable = true)
    private String month;

    @Column(name = "GRADING", insertable = true, updatable = true)
    private char grading;

    @Column(name = "TIMESTAMP", nullable = false, updatable = true)
    private Timestamp timestamp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "STUDENT_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
    private User student;

    public Grade(String studentId, String month, char grading) {
        this.studentId = studentId;
        this.month = month;
        this.grading = grading;
    }

    @PrePersist
    protected void onCreate() {
        if (this.gradesId == null) {
            this.gradesId = UUID.randomUUID().toString();
        }
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }
}
