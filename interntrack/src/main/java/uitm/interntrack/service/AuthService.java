package uitm.interntrack.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import uitm.interntrack.entity.User;
import uitm.interntrack.entity.User.UserDTO;
import uitm.interntrack.repository.UserRepository;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  private static final SecretKey KEY = Jwts.SIG.HS256.key().build();
  private static final String ISSUER = "interntrack";
  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

  private static String generateToken(UserDTO user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getUserId());
    claims.put("name", user.getName());
    claims.put("role", user.getRole());
    claims.put("companyId", user.getCompanyId());
    claims.put("universityId", user.getUniversityId());
    claims.put("isApproved", user.getIsApproved());

    Instant now = Instant.now();
    Instant expiration = now.plus(1, ChronoUnit.HOURS);

    return Jwts.builder()
        .claims(claims)
        .issuer(ISSUER)
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiration))
        .signWith(KEY)
        .compact();
  }

  private static Claims validateToken(String token) {
    try {
      Jws<Claims> jws = Jwts.parser()
          .verifyWith(KEY)
          .requireIssuer(ISSUER)
          .build()
          .parseSignedClaims(token);

      return jws.getPayload();
    } catch (JwtException e) {
      throw new IllegalArgumentException("Invalid token: " + e.getMessage());
    }
  }

  public Map<String, Object> loginUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User %s not found", email));
    }

    if (!user.get().getPassword().equals(password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
    }

    String token = generateToken(new UserDTO(user.get()));

    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", new UserDTO(user.get()));

    return response;
  }

  public Boolean isAuthorised(String token) {
    try {
      Claims claims = validateToken(token);
      logger.info("Claims: {}", claims);
      return true;
    } catch (IllegalArgumentException e) {
      logger.error("Token invalid: {}", e.getMessage());
      return false;
    }
  }
}
