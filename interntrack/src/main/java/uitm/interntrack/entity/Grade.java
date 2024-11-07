package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "GRADES", schema = "INTERNTRACK")
public class Grade {

    public enum Month {
        JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC;
    }

    public enum Grading {
        A, B, C, D, E;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long gradesId;

    private String studentId;
    private Month month;
    private Grading grading;
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

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Grading getGrading() {
        return grading;
    }

    public void setGrading(Grading grading) {
        this.grading = grading;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
