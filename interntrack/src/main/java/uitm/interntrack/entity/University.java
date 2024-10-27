package uitm.interntrack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UNIVERSITIES", schema = "INTERNTRACK")
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String name;
    private String location;
}
