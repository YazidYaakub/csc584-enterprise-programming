package uitm.interntrack.service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Jwts;

public class JwtTokenGenerator {
  public static String generateToken(String email, String name, String role) {
    Key key = Jwts.SIG.HS256.key().build();

    Map<String, Object> claims = new HashMap<>();
    claims.put("sub", email);
    claims.put("name", name);
    claims.put("role", role);

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
