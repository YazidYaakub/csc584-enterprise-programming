package uitm.interntrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uitm.interntrack.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
