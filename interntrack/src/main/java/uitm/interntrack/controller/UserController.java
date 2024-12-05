package uitm.interntrack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uitm.interntrack.entity.User.UserDTO;
import uitm.interntrack.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/approve-user/{userId}")
    public ResponseEntity<UserDTO> approveUser(@PathVariable("userId") Long userId) {
        UserDTO approvedUser = userService.approveUser(userId);
        return ResponseEntity.ok(approvedUser);
    }
}
