package uitm.interntrack.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "ACTIVITIES", schema = "INTERNTRACK")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ACTIVITY_ID", columnDefinition = "VARCHAR(36)")
    private String activityId;

    private String studentId;
    private String activityTitle;

    private String activityDescription;
    private Timestamp activityDate;
    private int isApproved;
    private String approvedById;
    private Timestamp approvedAt;

    @PrePersist
    protected void onCreate() {
        if (activityDate == null) {
            activityDate = new Timestamp(System.currentTimeMillis());
        }
    }

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
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

    public String getApprovedById() {
        return approvedById;
    }

    public void setApprovedById(String approvedById) {
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
        private String approvedById;
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

        public String getApprovedById() {
            return approvedById;
        }

        public void setApprovedById(String approvedById) {
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
