package uitm.interntrack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.User;
import uitm.interntrack.entity.User.UpdateUserDTO;
import uitm.interntrack.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserService userService;

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

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO user) {

    User targetUser = userService.getUser(id);

    if (targetUser == null) {
      return ResponseEntity.notFound().build();
    }

    User updatedUser = userService.updateUser(id, user);
    return ResponseEntity.ok(updatedUser);
  }

}
