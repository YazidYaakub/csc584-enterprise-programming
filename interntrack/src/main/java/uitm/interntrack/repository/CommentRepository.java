package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uitm.interntrack.entity.Comment;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    //1. Query for createComment from @CommentService.java  
    @Query(value = """
        INSERT INTO INTERNTRACK.COMMENTS (COMMENT_ID, COMMENT_CONTENT, COMMENT_DATE, COMMENT_AUTHOR_ID, COMMENT_ACTIVITY_ID)
        VALUES (:commentId, :commentContent, :commentDate, :commentAuthorId, :commentActivityId)
        """, nativeQuery = true)
    Comment createComment(@Param("commentId") Long commentId, @Param("commentContent") String commentContent, @Param("commentDate") Timestamp commentDate, @Param("commentAuthorId") Long commentAuthorId, @Param("commentActivityId") Long commentActivityId);

    //2. Query for getComments from @CommentService.java
    @Query(value = """
        SELECT * FROM INTERNTRACK.COMMENTS
        """, nativeQuery = true)
    List<Comment> getComments();
}
