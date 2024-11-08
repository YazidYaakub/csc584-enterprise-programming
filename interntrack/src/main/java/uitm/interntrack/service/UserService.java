package uitm.interntrack.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uitm.interntrack.entity.User;
import uitm.interntrack.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Transactional(readOnly = true)
  public User getUser(Long id) {
    return userRepository.findByIdWithReference(id).orElse(null);
  }
}
