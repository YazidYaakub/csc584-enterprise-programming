package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.User;
import uitm.interntrack.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

  private final UserService userService;
  private final Logger logger = LoggerFactory.getLogger(UserController.class);

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<User> registerUser(@RequestBody User user) {
    User savedUser = userService.createUser(user);
    logger.info("User registered: {}", savedUser);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    logger.info("Users retrieved: {}", users);
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.getUser(id);
    logger.info("User retrieved: {}", user);
    return ResponseEntity.ok(user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    logger.info("User deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    User updatedUser = userService.updateUser(id, user);
    logger.info("User updated: {}", updatedUser);
    return ResponseEntity.ok(updatedUser);
  }
}
