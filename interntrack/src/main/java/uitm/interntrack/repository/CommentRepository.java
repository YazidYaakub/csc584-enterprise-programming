package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, String> {
}
