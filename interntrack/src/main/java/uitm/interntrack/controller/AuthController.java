package uitm.interntrack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.User;
import uitm.interntrack.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
    Map<String, Object> loginResponse = authService.loginUser(user.getEmail(), user.getPassword());
    return ResponseEntity.ok(loginResponse);
  }

}
