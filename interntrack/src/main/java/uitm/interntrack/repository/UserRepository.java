package uitm.interntrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import uitm.interntrack.entity.User;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  @Query(value = """
      INSERT INTO INTERNTRACK.USERS (EMAIL, NAME, PASSWORD, ROLE, COMPANY_ID, UNIVERSITY_ID)
      """, nativeQuery = true)
  User createUser(User user);

  @Query(value = """
      SELECT u.* FROM INTERNTRACK.USERS u
      LEFT JOIN INTERNTRACK.UNIVERSITIES univ ON u.UNIVERSITY_ID = univ.UNIVERSITY_ID
      LEFT JOIN INTERNTRACK.COMPANIES comp ON u.COMPANY_ID = comp.COMPANY_ID
      WHERE u.USER_ID = :userId
      """, nativeQuery = true)
  Optional<User> getUser(@Param("userId") Long userId);

  @Query(value = """
      SELECT * FROM (
        SELECT u.*, ROW_NUMBER() OVER (ORDER BY USER_ID) as ROW_NUM
        FROM INTERNTRACK.USERS u
        WHERE (:role IS NULL OR u.ROLE = :role)
        AND (:universityId IS NULL OR u.UNIVERSITY_ID = :universityId)
        AND (:companyId IS NULL OR u.COMPANY_ID = :companyId)
      ) sub
      WHERE sub.ROW_NUM BETWEEN :start AND :end
      """, nativeQuery = true)
  List<User> getUsers(
      @Param("start") Integer start,
      @Param("end") Integer end,
      @Param("role") String role,
      @Param("universityId") String universityId,
      @Param("companyId") String companyId);

  @Modifying
  @Query(value = """
      UPDATE INTERNTRACK.USERS
      SET NAME = :name, ADDRESS = :address, CONTACT_NUMBER = :contactNumber, IMAGE_LINK = :imageLink, SEMESTER = :semester, POSITION = :position, SUBJECT = :subject, PASSWORD = :password
      WHERE USER_ID = :userId
      """, nativeQuery = true)
  void updateUser(@Param("userId") Long userId, @Param("name") String name, @Param("address") String address,
      @Param("contactNumber") String contactNumber, @Param("imageLink") String imageLink,
      @Param("semester") Long semester, @Param("position") String position, @Param("subject") String subject,
      @Param("password") String password);

  @Query(value = """
            SELECT COUNT(*)
            FROM INTERNTRACK.USERS u
      WHERE (:role IS NULL OR u.ROLE = :role)
            """, nativeQuery = true)
  Long countUsers(@Param("role") String role);

  @Query(value = """
      DELETE FROM INTERNTRACK.USERS
      WHERE USER_ID = :userId
      """, nativeQuery = true)
  void deleteUser(@Param("userId") Long userId);

  @Query(value = """
      SELECT u.* FROM INTERNTRACK.USERS u
      WHERE u.EMAIL = :email
      """, nativeQuery = true)
  Optional<User> findByEmail(@Param("email") String email);

  @Query(value = """
      SELECT
        student.name AS STUDENT_NAME,
        advisor.name AS ADVISOR_NAME,
        supervisor.name AS SUPERVISOR_NAME
      FROM INTERNTRACK.STUDENT_CONSULTANTS sc
      LEFT JOIN INTERNTRACK.USERS student ON student.USER_ID = sc.STUDENT_ID
      LEFT JOIN INTERNTRACK.USERS advisor ON advisor.USER_ID = sc.ADVISOR_ID
      LEFT JOIN INTERNTRACK.USERS supervisor ON supervisor.USER_ID = sc.SUPERVISOR_ID
      WHERE sc.STUDENT_ID = :studentId
      """, nativeQuery = true)
  List<Object[]> getReferencesByStudent(@Param("studentId") Long studentId);

  @Query(value = """
      SELECT
        student.name AS STUDENT_NAME,
        advisor.name AS ADVISOR_NAME,
        supervisor.name AS SUPERVISOR_NAME
      FROM INTERNTRACK.STUDENT_CONSULTANTS sc
      LEFT JOIN INTERNTRACK.USERS student ON student.USER_ID = sc.STUDENT_ID
      LEFT JOIN INTERNTRACK.USERS advisor ON advisor.USER_ID = sc.ADVISOR_ID
      LEFT JOIN INTERNTRACK.USERS supervisor ON supervisor.USER_ID = sc.SUPERVISOR_ID
      WHERE sc.ADVISOR_ID = :advisorId
      """, nativeQuery = true)
  List<Object[]> getReferencesByAdvisor(@Param("advisorId") Long advisorId);

  @Query(value = """
      SELECT
        student.name AS STUDENT_NAME,
        advisor.name AS ADVISOR_NAME,
        supervisor.name AS SUPERVISOR_NAME
      FROM INTERNTRACK.STUDENT_CONSULTANTS sc
      LEFT JOIN INTERNTRACK.USERS student ON student.USER_ID = sc.STUDENT_ID
      LEFT JOIN INTERNTRACK.USERS advisor ON advisor.USER_ID = sc.ADVISOR_ID
      LEFT JOIN INTERNTRACK.USERS supervisor ON supervisor.USER_ID = sc.SUPERVISOR_ID
      WHERE sc.SUPERVISOR_ID = :supervisorId
      """, nativeQuery = true)
  List<Object[]> getReferencesBySupervisor(@Param("supervisorId") Long supervisorId);
}
