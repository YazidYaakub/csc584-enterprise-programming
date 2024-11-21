package uitm.interntrack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uitm.interntrack.entity.User;
import uitm.interntrack.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public Map<String, Object> getUsers(Integer page, Integer size, String role) {
    Integer start = page * size + 1;
    Integer end = start + size - 1;

    List<User> users = userRepository.getUsers(start, end, role);
    Long totalCount = userRepository.countUsers(role);

    Map<String, Object> response = new HashMap<>();
    response.put("users", users);
    response.put("total", totalCount);
    response.put("page", page);
    response.put("size", size);

    return response;
  }

  @Transactional(readOnly = true)
  public User getUser(Long id) {
    return userRepository.findByIdWithReference(id).orElse(null);
  }

}
