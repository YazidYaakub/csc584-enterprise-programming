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
  public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
    var targetComment = this.commentService.createComment(comment);
    logger.info("Comment created: {}", targetComment);
    return ResponseEntity.ok(targetComment);
  }

  @GetMapping("/")
  public ResponseEntity<List<Comment>> getComments() {
    var comments = commentService.getComments();
    logger.info("Comments retrieved: {}", comments);
    return ResponseEntity.ok(comments);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
    commentService.deleteComment(id);
    logger.info("Comment deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
    Comment updatedComment = commentService.updateComment(id, comment);
    logger.info("Comment updated: {}", updatedComment);
    return ResponseEntity.ok(updatedComment);
  }
}
