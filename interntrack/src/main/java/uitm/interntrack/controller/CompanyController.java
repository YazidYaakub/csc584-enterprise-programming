package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<List<Company>> getCompanies(
      @RequestParam(required = false) Integer page,
      @RequestParam(required = false) Integer size,
      @RequestParam(required = false) String role) {
    int pageNumber = (page != null && page >= 0) ? page : 0;
    int pageSize = (size != null && size >= 0) ? size : 10;

    List<Company> companies = companyService.getCompanies(pageNumber, pageSize, role);
    return ResponseEntity.ok(companies);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Company> getCompany(@PathVariable Long id) {
    Company company = companyService.getCompanyById(id);
    return ResponseEntity.ok(company);
  }

}
