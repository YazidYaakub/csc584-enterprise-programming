package uitm.interntrack.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import uitm.interntrack.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
  @Query(value = "SELECT * FROM Company WHERE role = :role", countQuery = "SELECT count(*) FROM Company WHERE role = :role", nativeQuery = true)
  Page<Company> getCompanies(@Param("role") String role, Pageable pageable);
}
