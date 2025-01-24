package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.Company;
import uitm.interntrack.repository.CompanyRepository;

@Service
public class CompanyService {

  private final CompanyRepository companyRepository;

  public CompanyService(CompanyRepository companyRepository) {
    this.companyRepository = companyRepository;
  }

  public Company createCompany(Company company) {
    return companyRepository.save(company);
  }

  public List<Company> getCompanies() {
    return companyRepository.findAll();
  }

  public Company getCompanyById(Long id) {
    return companyRepository.findById(id).orElse(null);
  }

}
