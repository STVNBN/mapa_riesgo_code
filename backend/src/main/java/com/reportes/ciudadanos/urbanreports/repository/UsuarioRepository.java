package com.reportes.ciudadanos.urbanreports.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reportes.ciudadanos.urbanreports.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByTelefono(String telefono);
}
