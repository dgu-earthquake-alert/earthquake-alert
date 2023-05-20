package com.example.earthquakealertspring.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;
    @Value("${jwt.token-validity-in-seconds}")
    private int EXPIRATION_TIME;

    public String create(Authentication authentication) {
        System.out.println(SECRET_KEY);
        OAuth2User userPrincipal = (OAuth2User) authentication.getPrincipal();
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(EXPIRATION_TIME, ChronoUnit.SECONDS));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .setSubject(userPrincipal.getName())
                .setIssuer("dguEarthquakeAlert")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String validateAndGetUserId(String token, HttpServletResponse response) throws IOException {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();

            if (expirationDate.before(currentDate)) {
                throw new ExpiredJwtException(null, null, "Token has expired");
            }

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            response.sendRedirect("/auth/authorize");
            return null;
        } catch (Exception e) {

            response.sendRedirect("/auth/authorize");
            return null;
        }
    }

}
