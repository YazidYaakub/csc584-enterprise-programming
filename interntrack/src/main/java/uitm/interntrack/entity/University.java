package uitm.interntrack.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "UNIVERSITIES", schema = "INTERNTRACK")
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long universityId;

    @Column(nullable = false)
    private String name;

    private String location;

    @OneToMany(mappedBy = "university")
    private List<User> users;

    public Long getUniversityId() {
        return universityId;
    }

    public void setId(Long universityId) {
        this.universityId = universityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
