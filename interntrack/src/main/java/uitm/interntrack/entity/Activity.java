package uitm.interntrack.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "activities", schema = "INTERNTRACK")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long activityId;

    private long studentId;
    private String activityName;
    private Timestamp activityDate;
    private int isApproved;
    private long approvedById;
    private Timestamp approvedAt;
}
