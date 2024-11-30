package uitm.interntrack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.User;
import uitm.interntrack.service.AuthService;
import uitm.interntrack.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
    Map<String, Object> loginResponse = authService.loginUser(user.getEmail(), user.getPassword());
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/register")
  public ResponseEntity<User> registerUser(@RequestBody User user) {

    User savedUser = userService.createUser(user);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/")
  public ResponseEntity<Map<String, Object>> getUsers(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(required = false) String role,
      @RequestParam(required = false) String universityId,
      @RequestParam(required = false) String companyId) {

    Map<String, Object> users = userService.getUsers(page, size, role, universityId, companyId);
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUser(@PathVariable Long id) {

    User user = userService.getUser(id);

    if (user == null) {
      return ResponseEntity.status(404).body(String.format("User with ID %d not found", id));
    }

    return ResponseEntity.ok(user);
  }

}
