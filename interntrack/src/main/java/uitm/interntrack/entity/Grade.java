package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "GRADES", schema = "INTERNTRACK")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long gradesId;

    private Long studentId;
    private String month;
    private String grade;
    private Timestamp createdAt;

    public Grade() {
    }

    public Grade(Long studentId, String month, String grade) {
        this.studentId = studentId;
        this.month = month;
        this.grade = grade;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getGradesId() {
        return gradesId;
    }

    public void setGradesId(Long gradesId) {
        this.gradesId = gradesId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}