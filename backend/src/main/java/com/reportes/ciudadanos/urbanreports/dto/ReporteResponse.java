package com.reportes.ciudadanos.urbanreports.dto;

public class ReporteResponse {
    private Long id;
    private String telefono;     // 👈 antes correo
    private String tipoDeReporte;
    private String descripcion;
    private String direccion;
    private String latitud;
    private String longitud;

    public ReporteResponse(Long id, String telefono, String tipoDeReporte,
                           String descripcion, String direccion, String latitud, String longitud) {
        this.id = id;
        this.telefono = telefono;
        this.tipoDeReporte = tipoDeReporte;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public Long getId() { return id; }
    public String getTelefono() { return telefono; }
    public String getTipoDeReporte() { return tipoDeReporte; }
    public String getDescripcion() { return descripcion; }
    public String getDireccion() { return direccion; }
    public String getLatitud() { return latitud; }
    public String getLongitud() { return longitud; }
}
