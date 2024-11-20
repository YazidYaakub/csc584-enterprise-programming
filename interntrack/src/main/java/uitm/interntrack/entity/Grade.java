package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "GRADES", schema = "INTERNTRACK")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long gradesId;

    private String studentId;
    private String month;
    private char grading;
    private Timestamp timestamp;

    public Long getGradesId() {
        return gradesId;
    }

    public void setGradesId(Long gradesId) {
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
