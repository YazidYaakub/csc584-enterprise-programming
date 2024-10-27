package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
