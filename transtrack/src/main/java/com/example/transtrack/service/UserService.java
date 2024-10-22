package com.example.transtrack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.transtrack.entity.User;
import com.example.transtrack.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }
}
