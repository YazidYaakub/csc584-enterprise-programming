package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import uitm.interntrack.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findByActivityId(Long activityId);
  List<Comment> findByUserId(Long userId);
}