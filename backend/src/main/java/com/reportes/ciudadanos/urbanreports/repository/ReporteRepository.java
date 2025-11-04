package com.reportes.ciudadanos.urbanreports.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reportes.ciudadanos.urbanreports.model.Reporte;

public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findAllByOrderByIdDesc();
}
