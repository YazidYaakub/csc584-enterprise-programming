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

  @Query(value = """
      SELECT COUNT(*)
      FROM INTERNTRACK.USERS u
      WHERE (:role IS NULL OR u.ROLE = :role)
      """, nativeQuery = true)
  Long countUsers(@Param("role") String role);
}
