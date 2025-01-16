// UserRepository.java
package uitm.interntrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import uitm.interntrack.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  @Query(value = """
      SELECT * FROM (
        SELECT u.*, ROW_NUMBER() OVER (ORDER BY u.ID) AS row_num
        FROM INTERNTRACK.USERS u
        WHERE (:role IS NULL OR u.ROLE = :role)
          AND (:isApproved IS NULL OR u.IS_APPROVED = :isApproved)
          AND (:universityId IS NULL OR u.UNIVERSITY_ID = :universityId)
          AND (:companyId IS NULL OR u.COMPANY_ID = :companyId)
      ) sub
      WHERE sub.row_num BETWEEN :start AND :end
      """, nativeQuery = true)
  List<User> getUsers(@Param("start") Integer start, @Param("end") Integer end,
                      @Param("role") String role, @Param("isApproved") Integer isApproved,
                      @Param("universityId") String universityId, @Param("companyId") String companyId);

  @Query(value = "SELECT COUNT(*) FROM INTERNTRACK.USERS u WHERE (:role IS NULL OR u.ROLE = :role)", nativeQuery = true)
  Long countUsers(@Param("role") String role);

  @Modifying
  @Query(value = """
      UPDATE INTERNTRACK.USERS SET NAME = :name, ADDRESS = :address, CONTACT_NUMBER = :contactNumber,
          IMAGE_LINK = :imageLink, SEMESTER = :semester, POSITION = :position, SUBJECT = :subject,
          PASSWORD = :password
      WHERE ID = :id
      """, nativeQuery = true)
  void updateUser(@Param("id") Long id, @Param("name") String name, @Param("address") String address,
                  @Param("contactNumber") String contactNumber, @Param("imageLink") String imageLink,
                  @Param("semester") String semester, @Param("position") String position,
                  @Param("subject") String subject, @Param("password") String password);

  @Modifying
  @Query(value = "DELETE FROM INTERNTRACK.USERS WHERE ID = :id", nativeQuery = true)
  void deleteUser(@Param("id") Long id);
}