package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Company;
import uitm.interntrack.service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "*")
public class CompanyController {

  private final CompanyService companyService;

  public CompanyController(CompanyService companyService) {
    this.companyService = companyService;
  }

  @PostMapping("/create")
  public ResponseEntity<Company> createCompany(@RequestBody Company company) {
    Company savedCompany = companyService.createCompany(company);
    return ResponseEntity.ok(savedCompany);
  }

  @GetMapping("/")
  public ResponseEntity<List<Company>> getCompanies() {
    List<Company> companies = companyService.getCompanies();
    return ResponseEntity.ok(companies);
  }

}
