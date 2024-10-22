package com.example.transtrack.service;

import org.springframework.stereotype.Service;

import com.example.transtrack.entity.User;
import com.example.transtrack.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }
}
