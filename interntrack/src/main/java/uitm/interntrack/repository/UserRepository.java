package uitm.interntrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uitm.interntrack.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  @Query("SELECT u FROM User u LEFT JOIN FETCH u.university WHERE u.userId = :userId")
  Optional<User> findByIdWithReference(@Param("userId") Long userId);

  @Query(value = """
      SELECT * FROM (
        SELECT u.*, ROW_NUMBER()
        OVER (ORDER BY USER_ID) as row_num
        FROM USERS u
        WHERE u.role = 'STUDENT'
      )

      """, countQuery = "SELECT COUNT(*) FROM users WHERE role = :role", nativeQuery = true)
  List<User> getUsersPaginated(
      @Param("role") String role,
      @Param("start") int start,
      @Param("end") int end);

  @Query(value = "SELECT u FROM User u WHERE (:role IS NULL OR u.role = :role)")
  List<User> getUsers(@Param("role") String role);
}
