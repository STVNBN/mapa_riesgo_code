package com.reportes.ciudadanos.urbanreports;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors(Customizer.withDefaults())
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> auth
        // Permitir preflight CORS
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        // Público para health
        .requestMatchers("/actuator/health").permitAll()
        // Rutas protegidas
        .requestMatchers(HttpMethod.GET, "/api/**").authenticated()
        .requestMatchers(HttpMethod.POST, "/api/**").authenticated()
        .requestMatchers(HttpMethod.PUT, "/api/**").authenticated()
        .requestMatchers(HttpMethod.DELETE, "/api/**").authenticated()
        .anyRequest().authenticated()
      )
      .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cfg = new CorsConfiguration();
    cfg.setAllowedOrigins(List.of("http://localhost:4200")); // tu SPA local
    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("Authorization","Content-Type"));
    cfg.setExposedHeaders(List.of("Authorization")); // opcional, por si lees el header
    cfg.setAllowCredentials(true);
    cfg.setMaxAge(3600L); // cachea el preflight 1h

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cfg);
    return source;
  }
}
