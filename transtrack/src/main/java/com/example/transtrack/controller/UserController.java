package com.example.transtrack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.transtrack.entity.User;
import com.example.transtrack.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/api/users")
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

}
