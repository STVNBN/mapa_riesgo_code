package com.reportes.ciudadanos.urbanreports.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reporte")
public class Reporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reporte")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false) // el service siempre setea usuario por telefono
    private Usuario usuario;

    // Teléfono denormalizado para no hacer JOIN al listar
    @Column(name = "telefono", length = 8, nullable = true)
    private String telefono;

    @Column(name = "tipo_de_reporte", length = 100, nullable = false)
    private String tipoDeReporte;

    @Column(name = "descripcion", length = 500, nullable = true)
    private String descripcion;

    @Column(name = "direccion", length = 100, nullable = true)
    private String direccion;

    // Mantén String si tu columna sigue siendo varchar(100). Si migras a numeric(10,6),
    // cambia a BigDecimal y ajusta las anotaciones.
    @Column(name = "latitud", length = 100, nullable = true)
    private String latitud;

    @Column(name = "longitud", length = 100, nullable = true)
    private String longitud;

     // mejora: estado del reporte //JF
    @Column(name = "estado", length = 30, nullable = false)
    private String estado = "RECIBIDO"; // valor por defecto al crear

    // Almacén binario en PostgreSQL (bytea). Evita OID/LOB.
    @JsonIgnore // por si accidentalmente serializas la entidad
    @Column(name = "foto", columnDefinition = "bytea", nullable = true)
    @JdbcTypeCode(SqlTypes.VARBINARY)
    private byte[] foto;

    public Reporte() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getTipoDeReporte() { return tipoDeReporte; }
    public void setTipoDeReporte(String tipoDeReporte) { this.tipoDeReporte = tipoDeReporte; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getLatitud() { return latitud; }
    public void setLatitud(String latitud) { this.latitud = latitud; }

    public String getLongitud() { return longitud; }
    public void setLongitud(String longitud) { this.longitud = longitud; }

    // mejora: getters/setters de estado // JF
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public byte[] getFoto() { return foto; }
    public void setFoto(byte[] foto) { this.foto = foto; }
}
