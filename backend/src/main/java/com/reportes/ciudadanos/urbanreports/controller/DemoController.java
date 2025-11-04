package com.reportes.ciudadanos.urbanreports.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class DemoController {

    @GetMapping("/api/hola")
    public Map<String, String> hola() {
        return Map.of("mensaje", "Auth0 + Spring Boot + Angular OK ✅");
    }
}
