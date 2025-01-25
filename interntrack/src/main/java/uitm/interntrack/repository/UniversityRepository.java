package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uitm.interntrack.entity.University;
import java.util.List;
import java.util.Optional;


@Repository
public interface UniversityRepository extends JpaRepository<University, String> {

//1. Query for createUniversity from @UniversityService.java
@Query(value = """
    INSERT INTO INTERNTRACK.UNIVERSITIES (name, address, phone_number, email, website)
    VALUES (:name, :address, :phoneNumber, :email, :website)
    """, nativeQuery = true)
  void createUniversity(@Param("name") String name, @Param("address") String address, @Param("phoneNumber") String phoneNumber, @Param("email") String email, @Param("website") String website);

  //2. Query for getAllUniversities from @UniversityService.java
  @Query(value = """
    SELECT * FROM INTERNTRACK.UNIVERSITIES
    """, nativeQuery = true)
  List<University> getAllUniversities();

  //3. Query for getUniversityById from @UniversityService.java
  @Query(value = """
    SELECT * FROM INTERNTRACK.UNIVERSITIES
    WHERE UNIVERSITY_ID = :universityId
    """, nativeQuery = true)
  Optional<University> getUniversityById(@Param("universityId") String universityId);
}
