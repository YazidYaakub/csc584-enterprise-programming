package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.User;
import uitm.interntrack.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<User> registerUser(@RequestBody User user) {
    User savedUser = userService.createUser(user);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.getUser(id);
    return ResponseEntity.ok(user);
  }

}
