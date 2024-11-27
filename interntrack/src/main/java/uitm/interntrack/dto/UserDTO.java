package uitm.interntrack.dto;

import java.util.ArrayList;
import java.util.List;

import uitm.interntrack.entity.User;

public class UserDTO extends User {
  private Supervisor supervisor;
  private Advisor advisor;
  private Student student;
  private List<Student> students;

  public void addStudent(Student student) {
    if (students == null) {
      students = new ArrayList<>();
    }
    students.add(student);
  }

  public Supervisor getSupervisor() {
    return supervisor;
  }

  public void setSupervisor(Supervisor supervisor) {
    this.supervisor = supervisor;
  }

  public Advisor getAdvisor() {
    return advisor;
  }

  public void setAdvisor(Advisor advisor) {
    this.advisor = advisor;
  }

  public Student getStudent() {
    return student;
  }

  public void setStudent(Student student) {
    this.student = student;
  }

  public static class Student {
    private String name;

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }
  }

  public static class Supervisor {
    private String name;

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }
  }

  public static class Advisor {
    private String name;

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }
  }

  public UserDTO(User user) {
    this.setUserId(user.getUserId());
    this.setName(user.getName());
    this.setEmail(user.getEmail());
    this.setPassword(user.getPassword());
    this.setRole(user.getRole());
    this.setCompanyId(user.getCompanyId());
    this.setUniversityId(user.getUniversityId());
    this.setCompany(user.getCompany());
    this.setUniversity(user.getUniversity());
  }
}
