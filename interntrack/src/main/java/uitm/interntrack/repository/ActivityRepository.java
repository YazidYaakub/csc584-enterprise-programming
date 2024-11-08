package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
