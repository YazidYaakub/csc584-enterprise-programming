package uitm.interntrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies", schema = "INTERNTRACK")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long companyId;

    private String name;
    private String natureBusiness;
    private String location;
}
