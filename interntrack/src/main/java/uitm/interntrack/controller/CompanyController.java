package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Company;
import uitm.interntrack.service.CompanyService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "*")
public class CompanyController {

  private final CompanyService companyService;
  private final Logger logger = LoggerFactory.getLogger(CompanyController.class);

  public CompanyController(CompanyService companyService) {
    this.companyService = companyService;
  }

  @PostMapping("/create")
  public ResponseEntity<Company> createCompany(@RequestBody Company company) {
    Company savedCompany = companyService.createCompany(company);
    logger.info("Company created: {}", savedCompany);
    return ResponseEntity.ok(savedCompany);
  }

  @GetMapping("/")
  public ResponseEntity<List<Company>> getCompanies() {
    List<Company> companies = companyService.getCompanies();
    logger.info("Companies retrieved: {}", companies);
    return ResponseEntity.ok(companies);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
    companyService.deleteCompany(id);
    logger.info("Company deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company company) {
    Company updatedCompany = companyService.updateCompany(id, company);
    logger.info("Company updated: {}", updatedCompany);
    return ResponseEntity.ok(updatedCompany);
  }

}
