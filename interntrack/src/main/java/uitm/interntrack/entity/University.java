package uitm.interntrack.entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

@Entity
@Table(name = "UNIVERSITIES", schema = "INTERNTRACK")
public class University {

    @Id
    @Column(name = "UNIVERSITY_ID", columnDefinition = "VARCHAR(36)")
    private String universityId; // UUID will be stored as a string in the database

    @Column(nullable = false)
    private String name;

    private String location;
    private Double latitude;
    private Double longitude;
    private String courses;
    private String website;
    private String email;
    private String contactNumber;
    private String logoLink;

    @OneToMany(mappedBy = "university")
    private List<User> users;

    @PrePersist
    protected void onCreate() {
        if (this.universityId == null) {
            this.universityId = UUID.randomUUID().toString();
        }
    }

    public String getUniversityId() {
        return universityId;
    }

    public void setId(String universityId) {
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCourses() {
        return courses;
    }

    public void setCourses(String courses) {
        this.courses = courses;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getLogoLink() {
        return logoLink;
    }

    public void setLogoLink(String logoLink) {
        this.logoLink = logoLink;
    }
}
