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
    private long gradesId;

    private String studentId;
    private Month month;
    private Grading grading;
    private Timestamp timestamp;
}
