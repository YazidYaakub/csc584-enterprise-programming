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
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import uitm.interntrack.entity.User;
import uitm.interntrack.entity.User.UpdateUserDTO;
import uitm.interntrack.entity.User.UserDTO;
import uitm.interntrack.service.AuthService;
import uitm.interntrack.service.UserService;

// TODO: migrate name to user controller
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
  public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {

    UserDTO savedUser = userService.createUser(user);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/")
  public ResponseEntity<Map<String, Object>> getUsers(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(required = false) String role,
      @RequestParam(required = false) Integer isApproved,
      @RequestParam(required = false) String universityId,
      @RequestParam(required = false) String companyId) {

    Map<String, Object> users = userService.getUsers(page, size, role, isApproved, universityId, companyId);
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUser(@PathVariable String id) {
    try {
      return ResponseEntity.ok(userService.getUser(id));
    } catch (ResponseStatusException e) {
      return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UpdateUserDTO user,
      HttpServletRequest request) {
    String token = request.getHeader("Authorization");

    try {
      UserDTO updatedUser = userService.updateUser(id, user, token);
      return ResponseEntity.ok(updatedUser);
    } catch (ResponseStatusException e) {
      return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
  }
}
