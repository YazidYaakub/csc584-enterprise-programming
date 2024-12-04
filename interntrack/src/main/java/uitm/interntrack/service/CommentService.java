package uitm.interntrack.service;

import java.util.List;
import java.sql.Timestamp;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.Comment;
import uitm.interntrack.repository.CommentRepository;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Long activityId, Long userId, Comment comment) {
        comment.setActivityId(activityId);
        comment.setUserId(userId);
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        comment.setAcknowledged(0); 

        return this.commentRepository.save(comment);
    }

    public List<Comment> getComments(Long activityId) {
        return commentRepository.findByActivityId(activityId);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public Comment updateComment(Long commentId, Comment comment) {
        Comment existingComment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        existingComment.setComment(comment.getComment());
        existingComment.setAcknowledged(comment.getAcknowledged());
        
        return commentRepository.save(existingComment);
    }
}