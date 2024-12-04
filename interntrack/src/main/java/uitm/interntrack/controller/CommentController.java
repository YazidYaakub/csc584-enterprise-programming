package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Comment;
import uitm.interntrack.service.CommentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "*")
public class CommentController {

  private final CommentService commentService;
  private final Logger logger = LoggerFactory.getLogger(CommentController.class);

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/create")
  public ResponseEntity<Comment> createComment(@RequestParam Long activityId, @RequestParam Long userId, @RequestBody Comment comment) {
    var targetComment = this.commentService.createComment(activityId, userId, comment);
    logger.info("Comment created: {}", targetComment);
    return ResponseEntity.ok(targetComment);
  }

  @GetMapping("/activity/{activityId}")
  public ResponseEntity<List<Comment>> getComments(@PathVariable Long activityId) {
    var comments = commentService.getComments(activityId);
    logger.info("Comments retrieved for activity {}: {}", activityId, comments);
    return ResponseEntity.ok(comments);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
    commentService.deleteComment(commentId);
    logger.info("Comment deleted: {}", commentId);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
    Comment updatedComment = commentService.updateComment(commentId, comment);
    logger.info("Comment updated: {}", updatedComment);
    return ResponseEntity.ok(updatedComment);
  }
}
