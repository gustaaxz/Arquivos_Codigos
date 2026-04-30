package org.example;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class AtribuirPedidoMotorista {
    private int id, pedido_id, motorista_id;
    private LocalDate data_saida, data_entrega;
    private String statusEntrega;

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public AtribuirPedidoMotorista(int id, int pedido_id, int motorista_id, String data_saida, String data_entrega, String statusEntrega) {
        this.id = id;
        this.pedido_id = pedido_id;
        this.motorista_id = motorista_id;
        this.data_saida = LocalDate.parse(data_saida, FMT);
        this.data_entrega = LocalDate.parse(data_entrega, FMT);
        this.statusEntrega = statusEntrega;
    }

    public AtribuirPedidoMotorista(int pedido_id, int motorista_id, String data_saida, String data_entrega, String statusEntrega) {
        this.pedido_id = pedido_id;
        this.motorista_id = motorista_id;
        this.data_saida = LocalDate.parse(data_saida, FMT);
        this.data_entrega = LocalDate.parse(data_entrega, FMT);
        this.statusEntrega = statusEntrega;
    }

    public int getId() {
        return id;
    }

    public int getPedido_id() {
        return pedido_id;
    }

    public int getMotorista_id() {
        return motorista_id;
    }

    public LocalDate getData_saida() {
        return data_saida;
    }

    public LocalDate getData_entrega() {
        return data_entrega;
    }

    public String getStatusEntrega() {
        return statusEntrega;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPedido_id(int pedido_id) {
        this.pedido_id = pedido_id;
    }

    public void setMotorista_id(int motorista_id) {
        this.motorista_id = motorista_id;
    }

    public void setData_saida(LocalDate data_saida) {
        this.data_saida = data_saida;
    }

    public void setData_entrega(LocalDate data_entrega) {
        this.data_entrega = data_entrega;
    }

    public void setStatusEntrega(String statusEntrega) {
        this.statusEntrega = statusEntrega;
    }
}
