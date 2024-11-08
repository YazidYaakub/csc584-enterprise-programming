package uitm.interntrack.entity;

import java.sql.Timestamp;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "USERS", schema = "INTERNTRACK")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long userId;

  @Column(unique = true, nullable = false)
  private String email;

  private String name;
  private String password;
  private String role;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Timestamp createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Timestamp updatedAt;

  @Column(nullable = true)
  private Long companyId;

  @Column(nullable = true)
  private Long universityId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "universityId", insertable = false, updatable = false)
  private University university;

  @PrePersist
  protected void onCreate() {
    role = "STUDENT";
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public Timestamp getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }

  public Long getUniversityId() {
    return universityId;
  }

  public void setUniversityId(Long universityId) {
    this.universityId = universityId;
  }

  public University getUniversity() {
    return university;
  }

  public void setUniversity(University university) {
    this.university = university;
  }
}
