// ActivityRepository.java
package uitm.interntrack.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import uitm.interntrack.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

  @Query(value = """
      SELECT * FROM (
        SELECT activity.*, ROW_NUMBER() OVER (ORDER BY ACTIVITY_DATE) as ROW_NUM
        FROM INTERNTRACK.ACTIVITIES activity
        WHERE (:studentId IS NULL OR activity.STUDENT_ID = :studentId)
        AND (:month IS NULL OR EXTRACT(MONTH FROM activity.ACTIVITY_DATE) = :month)
      ) sub
      WHERE sub.ROW_NUM BETWEEN :start AND :end
      """, nativeQuery = true)
  List<Activity> getActivities(
      @Param("start") Integer start,
      @Param("end") Integer end,
      @Param("studentId") Long studentId,
      @Param("month") int month);

  @Modifying
  @Query(value = """
      UPDATE INTERNTRACK.ACTIVITIES
      SET ACTIVITY_TITLE = :activityTitle, ACTIVITY_DESCRIPTION = :activityDescription, APPROVED_BY_ID = :approvedById,
          APPROVED_AT = :approvedAt, IS_APPROVED = :isApproved
      WHERE ACTIVITY_ID = :activityId
      """, nativeQuery = true)
  void updateActivity(@Param("activityId") Long activityId, @Param("activityTitle") String activityTitle,
      @Param("activityDescription") String activityDescription, @Param("approvedById") Long approvedById,
      @Param("approvedAt") Timestamp approvedAt, @Param("isApproved") int isApproved);

  @Query(value = """
      SELECT COUNT(*)
      FROM INTERNTRACK.ACTIVITIES activity
      WHERE (:studentId IS NULL OR activity.STUDENT_ID = :studentId)
      AND (:month IS NULL OR EXTRACT(MONTH FROM activity.ACTIVITY_DATE) = :month)
      """, nativeQuery = true)
  Long countActivities(@Param("studentId") Long studentId, @Param("month") int month);
}