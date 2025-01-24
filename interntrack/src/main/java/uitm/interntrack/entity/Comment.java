package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "COMMENTS", schema = "INTERNTRACK")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "COMMENT_ID", columnDefinition = "VARCHAR(36)")
    private String commentId;

    private String activityId;
    private String comment;
    private Timestamp createdAt;
    private String userId;
    private int acknowledged;

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getAcknowledged() {
        return acknowledged;
    }

    public void setAcknowledged(int acknowledged) {
        this.acknowledged = acknowledged;
    }
}
