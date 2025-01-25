package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uitm.interntrack.entity.StudentConsultant;
import java.sql.Timestamp;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface StudentConsultantRepository extends JpaRepository<StudentConsultant, String> {

    // 1. Get student consultants based on studentId, advisorId, or supervisorId
    @Query(value = """
        SELECT * FROM INTERNTRACK.STUDENT_CONSULTANTS
        WHERE (:studentId IS NULL OR student_id = :studentId)
        AND (:advisorId IS NULL OR advisor_id = :advisorId)
        AND (:supervisorId IS NULL OR supervisor_id = :supervisorId)
    """, nativeQuery = true)
    List<StudentConsultant> getStudentConsultants(
        @Param("studentId") String studentId,
        @Param("advisorId") String advisorId,
        @Param("supervisorId") String supervisorId
    );

    // 2. Get student by userId
    @Query(value = """
    SELECT sc
    FROM StudentConsultant sc
    WHERE sc.studentId = :userId
    """)
    List<StudentConsultant> getStudentByUserId(@Param("userId") String userId);

    // 3. Get advisor by userId
    @Query(value = """
    SELECT sc
    FROM StudentConsultant sc
    WHERE sc.advisorId = :userId
    """)
    List<StudentConsultant> getAdvisorByUserId(@Param("userId") String userId);


    // 4. Get supervisor by userId
    @Query(value = """
    SELECT sc
    FROM StudentConsultant sc
    WHERE sc.supervisorId = :userId
    """)
    List<StudentConsultant> getSupervisorByUserId(@Param("userId") String userId);

    // Update StudentConsultant
    @Modifying
    @Query(value = """
        UPDATE INTERNTRACK.STUDENT_CONSULTANTS
        SET student_id = :studentId, advisor_id = :advisorId,
            supervisor_id = :supervisorId, assigned_at = :assignedAt
        WHERE student_consultant_id = :id
    """, nativeQuery = true)
    void updateStudentConsultant(
        @Param("id") Long id,
        @Param("studentId") String studentId,
        @Param("advisorId") String advisorId,
        @Param("supervisorId") String supervisorId,
        @Param("assignedAt") Timestamp assignedAt
    );

    // Count total consultants assigned to a student
    @Query(value = """
        SELECT COUNT(*)
        FROM INTERNTRACK.STUDENT_CONSULTANTS
        WHERE student_id = :studentId
    """, nativeQuery = true)
    Long countByStudentId(@Param("studentId") String studentId);
}
