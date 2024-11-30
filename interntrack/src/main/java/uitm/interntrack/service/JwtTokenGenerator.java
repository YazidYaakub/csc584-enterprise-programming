package uitm.interntrack.service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Jwts;
import uitm.interntrack.entity.User.UserDTO;

public class JwtTokenGenerator {
  public static String generateToken(UserDTO user) {
    Key key = Jwts.SIG.HS256.key().build();

    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getUserId());
    claims.put("name", user.getName());
    claims.put("role", user.getRole());
    claims.put("companyId", user.getCompanyId());
    claims.put("universityId", user.getUniversityId());

    Instant now = Instant.now();
    Instant expiration = now.plus(1, ChronoUnit.HOURS);

    return Jwts.builder()
        .claims(claims)
        .issuer("interntrack")
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiration))
        .signWith(key)
        .compact();
  }
}
