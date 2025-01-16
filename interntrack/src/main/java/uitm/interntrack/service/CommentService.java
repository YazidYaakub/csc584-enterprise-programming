package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.Comment;
import uitm.interntrack.repository.CommentRepository;

@Service
public class CommentService {

  private final CommentRepository commentRepository;

  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  public Comment createComment(Comment comment) {
    return this.commentRepository.save(comment);
  }

  public List<Comment> getComments() {
    return commentRepository.findAll();
  }
}