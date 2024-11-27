package uitm.interntrack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import uitm.interntrack.entity.User;
import uitm.interntrack.entity.User.UpdateUserDTO;
import uitm.interntrack.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public Map<String, Object> loginUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User %s not found", email));
    }

    if (!user.get().getPassword().equals(password)) {
      throw new RuntimeException("Invalid password");
    }

    String token = JwtTokenGenerator.generateToken(
        user.get().getEmail(),
        user.get().getName(),
        user.get().getRole());

    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", user.get());

    return response;
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
    return userRepository.getUser(id).orElseThrow(null);
  }

  public User updateUser(Long id, UpdateUserDTO updateUserDTO) {
    Optional<User> user = userRepository.findById(id);

    if (updateUserDTO.getName() != null) {
      user.get().setName(updateUserDTO.getName());
    }

    if (updateUserDTO.getPassword() != null) {
      user.get().setPassword(updateUserDTO.getPassword());
    }

    userRepository.updateUser(id, updateUserDTO.getName(), updateUserDTO.getPassword());

    return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
  }

  public void deleteUser(Long id) {
    userRepository.deleteUser(id);
  }

}
