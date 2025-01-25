package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "GRADES", schema = "INTERNTRACK")
public class Grade {

    @Id
    @Column(name = "GRADES_ID", columnDefinition = "VARCHAR(36)")
    private String gradesId;

    private String studentId;
    private String month;
    private char grading;
    private Timestamp timestamp;

    @PrePersist
    protected void onCreate() {
        if (this.gradesId == null) {
            this.gradesId = UUID.randomUUID().toString();
        }
    }

    public String getGradesId() {
        return gradesId;
    }

    public void setGradesId(String gradesId) {
        this.gradesId = gradesId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public char getGrading() {
        return grading;
    }

    public void setGrading(char grading) {
        this.grading = grading;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
