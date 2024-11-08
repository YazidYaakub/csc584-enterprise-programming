package uitm.interntrack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import uitm.interntrack.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query("SELECT u FROM User u LEFT JOIN FETCH u.university WHERE u.userId = :userId")
  Optional<User> findByIdWithReference(@Param("userId") Long userId);
}
