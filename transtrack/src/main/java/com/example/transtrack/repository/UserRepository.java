package com.example.transtrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.transtrack.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
