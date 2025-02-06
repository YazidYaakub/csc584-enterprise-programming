package uitm.interntrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uitm.interntrack.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
  // @Query(value = "SELECT * FROM Company WHERE role = :role", countQuery =
  // "SELECT count(*) FROM Company WHERE role = :role", nativeQuery = true)
  // Page<Company> getCompanies(@Param("role") String role, Pageable pageable);
  // 1. Query for createCompany from @CompanyService.java
  @Query(value = """
      INSERT INTO INTERNTRACK.COMPANIES (COMPANY_ID, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE_NUMBER, COMPANY_EMAIL, COMPANY_WEBSITE)
      VALUES (:companyId, :companyName, :companyAddress, :companyPhoneNumber, :companyEmail, :companyWebsite)
      """, nativeQuery = true)
  Company createCompany(@Param("companyId") String companyId, @Param("companyName") String companyName,
      @Param("companyAddress") String companyAddress, @Param("companyPhoneNumber") String companyPhoneNumber,
      @Param("companyEmail") String companyEmail, @Param("companyWebsite") String companyWebsite);

  // 2. Query for getCompanies from @CompanyService.java
  @Query(value = """
      SELECT * FROM INTERNTRACK.COMPANIES
      """, nativeQuery = true)
  List<Company> getCompanies();

  // 3. Query for getCompanyById from @CompanyService.java
  @Query(value = """
      SELECT * FROM INTERNTRACK.COMPANIES
      WHERE COMPANY_ID = :companyId
      """, nativeQuery = true)
  Optional<Company> getCompanyById(@Param("companyId") String companyId);
}
