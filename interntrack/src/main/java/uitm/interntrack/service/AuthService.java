package uitm.interntrack.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import uitm.interntrack.entity.User;
import uitm.interntrack.repository.UserRepository;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  public Map<String, Object> loginUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User %s not found", email));
    }

    if (!user.get().getPassword().equals(password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
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
}
