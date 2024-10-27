package uitm.interntrack.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "comments", schema = "INTERNTRACK")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long commentId;

    private long activityId;
    private String comment;
    private Timestamp createdAt;
    private long userId;
    private int acknowledged;
}
