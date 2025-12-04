package com.reportes.ciudadanos.urbanreports.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping; // mejora // JF
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reportes.ciudadanos.urbanreports.dto.ReporteResponse;
import com.reportes.ciudadanos.urbanreports.model.Reporte;
import com.reportes.ciudadanos.urbanreports.service.ReporteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class ReporteController {

    private final ReporteService reporteService;

    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public ReporteResponse crear(
            @RequestParam String telefono,
            @RequestParam String tipoDeReporte,
            @RequestParam String descripcion,
            @RequestParam String direccion,
            @RequestParam String latitud,
            @RequestParam String longitud,
            @RequestPart(required = false) MultipartFile foto
    ) throws Exception {
        Reporte r = reporteService.crearReporte(
                telefono, tipoDeReporte, descripcion, direccion, latitud, longitud, foto
        );
        return new ReporteResponse(
                r.getId(),
                r.getUsuario() != null ? r.getUsuario().getTelefono() : null,
                r.getTipoDeReporte(),
                r.getDescripcion(),
                r.getDireccion(),
                r.getLatitud(),
                r.getLongitud(),
                r.getEstado() // nuevo campo estado /JF
        );
    }

    @GetMapping
    public List<ReporteResponse> listar() {
        return reporteService.listar();
    }

  // mejora: obtener un reporte por ID (para "Ver estado de mi reporte") //JF
    @GetMapping("/{id}")
    public ResponseEntity<ReporteResponse> obtenerPorId(@PathVariable Long id) {
        return reporteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // Mejora: actualizar estado del reporte //JF
    @PatchMapping("/{id}/estado")
    public ReporteResponse actualizarEstado(
            @PathVariable Long id,
            @RequestParam String estado
    ) {
        return reporteService.actualizarEstado(id, estado);
    }

    //  NUEVO: sirve las imágenes guardadas en bytea
    @GetMapping("/{id}/foto")
    public ResponseEntity<byte[]> obtenerFoto(@PathVariable("id") Long id) {
        byte[] foto = reporteService.obtenerFoto(id);
        if (foto != null && foto.length > 0) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(foto, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
