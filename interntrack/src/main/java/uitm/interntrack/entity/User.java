package uitm.interntrack.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USERS", schema = "INTERNTRACK")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long userId;

  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  private String password;
  private String role;
  private Long semester;
  private String position;
  private String subject;
  private String contactNumber;
  private String imageLink;
  private String address;
  private Integer isApproved;

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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "companyId", insertable = false, updatable = false)
  private Company company;

  @PrePersist
  protected void onCreate() {
    if (role == null)
      role = "STUDENT";
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String role;
    private Long semester;
    private String position;
    private String subject;
    private String contactNumber;
    private String imageLink;
    private String address;
    private Long companyId;
    private Long universityId;
    private Long isApproved;
    private Company company;
    private University university;

    public UserDTO(User user) {
      this.userId = user.getUserId();
      this.name = user.getName();
      this.email = user.getEmail();
      this.role = user.getRole();
      this.semester = user.getSemester();
      this.position = user.getPosition();
      this.subject = user.getSubject();
      this.contactNumber = user.getContactNumber();
      this.imageLink = user.getImageLink();
      this.address = user.getAddress();
      this.companyId = user.getCompanyId();
      this.universityId = user.getUniversityId();
      this.company = user.getCompany();
      this.university = user.getUniversity();
    }
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class UpdateUserDTO {
    private String name;
    private String password;
    private String address;
    private String contactNumber;
    private String imageLink;
    private Long semester;
    private String position;
    private String subject;
  }
}
