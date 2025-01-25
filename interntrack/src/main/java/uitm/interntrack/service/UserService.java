package uitm.interntrack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import uitm.interntrack.entity.User;
import uitm.interntrack.entity.User.UpdateUserDTO;
import uitm.interntrack.entity.User.UserDTO;
import uitm.interntrack.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthService authService;

  public UserDTO createUser(User user) {
    user.setIsApproved(0);

    return new UserDTO(userRepository.save(user));
  }

  public Map<String, Object> getUsers(Integer page, Integer size, String role, Integer isApproved, String universityId,
      String companyId) {
    Integer start = page * size + 1;
    Integer end = start + size - 1;

    List<User> users = userRepository.getUsers(start, end, role, isApproved, universityId, companyId);
    List<UserDTO> userDTOs = users.stream().map(UserDTO::new).toList();
    Long totalCount = userRepository.countUsers(role);

    Map<String, Object> response = new HashMap<>();
    response.put("data", userDTOs);
    response.put("total", totalCount);
    response.put("page", page);
    response.put("size", size);

    return response;
  }

  public UserDTO getUser(String id) {
    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isEmpty())
      throw new ResponseStatusException(HttpStatus.NO_CONTENT, "User not found");

    return new UserDTO(userOptional.get());
  }

  public UserDTO updateUser(String id, UpdateUserDTO updateUserDTO, String token) {
    if (!authService.isAuthorised(token) || token == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }

    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isEmpty())
      throw new ResponseStatusException(HttpStatus.NO_CONTENT, "User not found");

    User user = userOptional.get();
    System.out.println(user.getPassword());

    user.setName(updateUserDTO.getName());
    user.setAddress(updateUserDTO.getAddress());
    user.setContactNumber(updateUserDTO.getContactNumber());
    user.setImageLink(updateUserDTO.getImageLink());
    user.setSemester(updateUserDTO.getSemester());
    user.setPosition(updateUserDTO.getPosition());
    user.setSubject(updateUserDTO.getSubject());

    if (updateUserDTO.getPassword() != null)
      user.setPassword(updateUserDTO.getPassword());

    userRepository.updateUser(id, updateUserDTO.getName(), updateUserDTO.getAddress(), updateUserDTO.getContactNumber(),
        updateUserDTO.getImageLink(), updateUserDTO.getSemester(), updateUserDTO.getPosition(),
        updateUserDTO.getSubject(), user.getPassword());

    return new UserDTO(user);
  }

  public void deleteUser(String id) {
    userRepository.deleteUser(id);
  }

  public UserDTO approveUser(String userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    if(user.getIsApproved() == 1) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "User already approved"); // Use HttpStatus.CONFLICT
    }
    user.setIsApproved(1);
    User savedUser = userRepository.save(user); 

    return new UserDTO(savedUser);
  }
}
