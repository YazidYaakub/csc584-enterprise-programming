package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Comment;
import uitm.interntrack.service.CommentService;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "*")
public class CommentController {

  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/create")
  public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
    var targetComment = this.commentService.createComment(comment);
    return ResponseEntity.ok(targetComment);
  }

  @GetMapping("/")
  public ResponseEntity<List<Comment>> getComments() {
    var comments = commentService.getComments();
    return ResponseEntity.ok(comments);
  }

}
