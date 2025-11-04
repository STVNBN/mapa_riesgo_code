package com.reportes.ciudadanos.urbanreports.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.reportes.ciudadanos.urbanreports.dto.ReporteResponse;
import com.reportes.ciudadanos.urbanreports.model.Reporte;
import com.reportes.ciudadanos.urbanreports.model.Usuario;
import com.reportes.ciudadanos.urbanreports.repository.ReporteRepository;
import com.reportes.ciudadanos.urbanreports.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReporteServiceImpl implements ReporteService {

    private final ReporteRepository reporteRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public Reporte crearReporte(
            String telefono,
            String tipoDeReporte,
            String descripcion,
            String direccion,
            String latitud,
            String longitud,
            MultipartFile foto
    ) throws Exception {

        // Validaciones básicas
        if (telefono == null || !telefono.matches("^[0-9]{8}$")) {
            throw new IllegalArgumentException("El teléfono debe tener exactamente 8 dígitos numéricos.");
        }
        if (tipoDeReporte == null || tipoDeReporte.isBlank()) {
            throw new IllegalArgumentException("El tipo de reporte es obligatorio.");
        }

        // Busca/crea el usuario por teléfono
        Usuario usuario = usuarioRepository.findByTelefono(telefono)
                .orElseGet(() -> {
                    Usuario u = new Usuario();
                    u.setTelefono(telefono);
                    return usuarioRepository.save(u);
                });

        // Construye la entidad Reporte
        Reporte r = new Reporte();
        r.setUsuario(usuario);
        r.setTelefono(telefono); // denormalizado
        r.setTipoDeReporte(tipoDeReporte);
        r.setDescripcion(descripcion);
        r.setDireccion(direccion);
        r.setLatitud(latitud);
        r.setLongitud(longitud);

        if (foto != null && !foto.isEmpty()) {
            r.setFoto(foto.getBytes());
        } else {
            r.setFoto(null);
        }

        return reporteRepository.save(r);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReporteResponse> listar() {
        return reporteRepository.findAll().stream()
                .sorted(Comparator.comparing(Reporte::getId).reversed())
                .map(r -> new ReporteResponse(
                        r.getId(),
                        (r.getTelefono() != null ? r.getTelefono()
                                : (r.getUsuario() != null ? r.getUsuario().getTelefono() : null)),
                        r.getTipoDeReporte(),
                        r.getDescripcion(),
                        r.getDireccion(),
                        r.getLatitud(),
                        r.getLongitud()
                ))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] obtenerFoto(Long id) {
        return reporteRepository.findById(id)
                .map(Reporte::getFoto)
                .orElse(null);
    }
}
