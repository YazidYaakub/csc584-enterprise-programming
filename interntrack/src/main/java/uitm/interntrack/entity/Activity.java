package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "ACTIVITIES", schema = "INTERNTRACK")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long activityId;

    private Long studentId;
    private String activityTitle;

    private String activityDescription;
    private Timestamp activityDate;
    private int isApproved;
    private Long approvedById;
    private Timestamp approvedAt;

    @PrePersist
    protected void onCreate() {
        if (activityDate == null) {
            activityDate = new Timestamp(System.currentTimeMillis());
        }
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public Timestamp getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(Timestamp activityDate) {
        this.activityDate = activityDate;
    }

    public int getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(int isApproved) {
        this.isApproved = isApproved;
    }

    public Long getApprovedById() {
        return approvedById;
    }

    public void setApprovedById(Long approvedById) {
        this.approvedById = approvedById;
    }

    public Timestamp getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Timestamp approvedAt) {
        this.approvedAt = approvedAt;
    }

    public static class UpdateActivityDTO {
        private String activityTitle;
        private String activityDescription;
        private int isApproved;
        private Long approvedById;
        private Timestamp approvedAt;

        public String getActivityTitle() {
            return activityTitle;
        }

        public void setActivityTitle(String activityTitle) {
            this.activityTitle = activityTitle;
        }

        public String getActivityDescription() {
            return activityDescription;
        }

        public void setActivityDescription(String activityDescription) {
            this.activityDescription = activityDescription;
        }

        public int getIsApproved() {
            return isApproved;
        }

        public void setIsApproved(int isApproved) {
            this.isApproved = isApproved;
        }

        public Long getApprovedById() {
            return approvedById;
        }

        public void setApprovedById(Long approvedById) {
            this.approvedById = approvedById;
        }

        public Timestamp getApprovedAt() {
            return approvedAt;
        }

        public String getApprovedAtString() {
            return approvedAt.toString();
        }

        public void setApprovedAt(Timestamp approvedAt) {
            this.approvedAt = approvedAt;
        }
    }
}
