package uitm.interntrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "COMPANIES", schema = "INTERNTRACK")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long companyId;

    private String name;
    private String natureBusiness;
    private String location;

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNatureBusiness() {
        return natureBusiness;
    }

    public void setNatureBusiness(String natureBusiness) {
        this.natureBusiness = natureBusiness;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
