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
      ) sub
      WHERE sub.ROW_NUM BETWEEN :start AND :end
      """, nativeQuery = true)
  List<User> getUsers(
      @Param("start") Integer start,
      @Param("end") Integer end,
      @Param("role") String role);

  @Modifying
  @Query(value = """
      UPDATE INTERNTRACK.USERS
      SET NAME = :name, PASSWORD = :password
      WHERE USER_ID = :userId
      """, nativeQuery = true)
  void updateUser(@Param("userId") Long userId, @Param("name") String name, @Param("password") String password);

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
}
