package com.revature.project_1.Controller;
import com.revature.project_1.Entity.User;
import com.revature.project_1.Service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;

        public UserController(UserService userService) {
        this.userService = userService;
        }

        // Register a new user
        @PostMapping("/register")
        public User registerUser(@RequestBody User user) {
            return userService.registerUser(user);
        }

        // Get all users (e.g., admin only)
        @GetMapping
        public List<User> getAllUsers() {
            return userService.getAllUsers();
        }

        // Login check
        @PostMapping("/login")
        public User login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
}


        // Delete user by ID
        @DeleteMapping("/{id}")
        public String deleteUser(@PathVariable Long id) {
            userService.deleteUser(id);
            return "User deleted successfully!";
        }
}

