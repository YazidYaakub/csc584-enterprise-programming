package uitm.interntrack.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "USERS", schema = "INTERNTRACK")
public class User {

  public enum Role {
    ADVISOR, ADMIN, SUPERVISOR, STUDENT
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long userId;

  private String name;
  private String email;
  private String password;
  private Role role;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private String companyId;
  private String universityId;

  public Long getId() {
    return userId;
  }

  public void setId(Long userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
