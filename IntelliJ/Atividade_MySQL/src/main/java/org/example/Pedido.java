package org.example;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Pedido {
    private int id, cliente_id, pedidoIdCancelar;
    private String volume_m3, peso_kg, statusPedido;
    private LocalDate data_pedido;

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Pedido(int id, int cliente_id, String data_pedido, String volume_m3, String peso_kg, String statusPedido) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.data_pedido = LocalDate.parse(data_pedido, FMT);
        this.volume_m3 = volume_m3;
        this.peso_kg = peso_kg;
        this.statusPedido = statusPedido;
    }

    public Pedido(int cliente_id, String data_pedido, String volume_m3, String peso_kg, String statusPedido) {
        this.cliente_id = cliente_id;
        this.data_pedido = LocalDate.parse(data_pedido, FMT);
        this.volume_m3 = volume_m3;
        this.peso_kg = peso_kg;
        this.statusPedido = statusPedido;
    }

    public Pedido(int pedidoIdCancelar) {
        this.pedidoIdCancelar = pedidoIdCancelar;
    }

    public LocalDate getData_pedido() {
        return data_pedido;
    }

    public int getCliente_id() {
        return cliente_id;
    }

    public String getVolume_m3() {
        return volume_m3;
    }

    public String getPeso_kg() {
        return peso_kg;
    }

    public String getStatusPedido() {
        return statusPedido;
    }

    public int getPedidoIdCancelar() {
        return pedidoIdCancelar;
    }

    public int getId() {
        return id;
    }

    public void setPedidoIdCancelar(int pedidoIdCancelar) {
        this.pedidoIdCancelar = pedidoIdCancelar;
    }

    public void setData_pedido(String data_pedido) {
        this.data_pedido = LocalDate.parse(data_pedido, FMT);
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCliente_id(int cliente_id) {
        this.cliente_id = cliente_id;
    }

    public void setVolume_m3(String volume_m3) {
        this.volume_m3 = volume_m3;
    }

    public void setPeso_kg(String peso_kg) {
        this.peso_kg = peso_kg;
    }

    public void setStatusPedido(String statusPedido) {
        this.statusPedido = statusPedido;
    }

    public void setData_pedido(LocalDate data_pedido) {
        this.data_pedido = data_pedido;
    }
}