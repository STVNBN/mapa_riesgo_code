package com.reportes.ciudadanos.urbanreports.service;

import java.util.List;
import java.util.Optional;   // mejora //JF

import org.springframework.web.multipart.MultipartFile;

import com.reportes.ciudadanos.urbanreports.dto.ReporteResponse;
import com.reportes.ciudadanos.urbanreports.model.Reporte;

public interface ReporteService {
    Reporte crearReporte(
            String telefono,
            String tipoDeReporte,
            String descripcion,
            String direccion,
            String latitud,
            String longitud,
            MultipartFile foto
    ) throws Exception;

    List<ReporteResponse> listar();
    
    byte[] obtenerFoto(Long id);

    // mejora: actualizar estado del reporte //JF
    ReporteResponse actualizarEstado(Long id, String estado);

      // mejora: obtener un reporte por ID (para "ver estado de mi reporte") //JF
    Optional<ReporteResponse> obtenerPorId(Long id);

}
