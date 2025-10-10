package com.revature.project_1.Service;

import com.revature.project_1.Entity.User;
import com.revature.project_1.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
     public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered!");
        }

        user.setRole("USER");
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login check
    public User login(String username, String password) {
    User foundUser = userRepository.findByUsername(username);
    if (foundUser != null && foundUser.getPassword().equals(password)) {
        return foundUser; 
    } else {
        throw new RuntimeException("Invalid username or password");
    }
}


    // Delete a user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
