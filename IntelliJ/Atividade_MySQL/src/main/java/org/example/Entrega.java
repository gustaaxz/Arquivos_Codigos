package org.example;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Entrega {
    private int id;
    private int pedido_id, quantidadeEntregas;
    private int motorista_id, idEntregaStatus;
    private LocalDate data_saida, data_entrega;
    private String statusEntrega, novoStatusEntrega, cliente_nome, motorista_nome;

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Entrega(int idEntregaStatus, String novoStatusEntrega) {
        this.idEntregaStatus = idEntregaStatus;
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public Entrega(int idEntregaExclusao) {
    }

    public Entrega(int id, String dataEn, String dataSa, String statusEn, String clienteNome, String motoristaNome) {
    }

    public Entrega(int id, String motorista_nome, int quantidadeEntregas) {
        this.id = id;
        this.motorista_nome = motorista_nome;
        this.quantidadeEntregas = quantidadeEntregas;
    }

    private void getNovoStatusEntrega(int id, String novoStatusEntrega) {
        this.id = id;
        this.novoStatusEntrega = novoStatusEntrega;
    }

    private void getNovoStatusEntrega(String novoStatusEntrega) {
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public void excluirEntrega(int id, int pedido_id, int motorista_id, String data_saida, String data_entrega, String statusEntrega) {
        this.id = id;
        this.pedido_id = pedido_id;
        this.motorista_id = motorista_id;
        this.data_saida = LocalDate.parse(data_saida, FMT);
        this.data_entrega = LocalDate.parse(data_entrega, FMT);
        this.statusEntrega = statusEntrega;
    }

    public void excluirEntrega(int pedido_id, int motorista_id, String data_saida, String data_entrega, String statusEntrega) {
        this.pedido_id = pedido_id;
        this.motorista_id = motorista_id;
        this.data_saida = LocalDate.parse(data_saida, FMT);
        this.data_entrega = LocalDate.parse(data_entrega, FMT);
        this.statusEntrega = statusEntrega;
    }

    public void listarEntregas(int id, String motorista_nome, String cliente_nome, String data_saida, String data_entrega, String statusEntrega) {
        this.id = id;
        this.cliente_nome = cliente_nome;
        this.motorista_nome = motorista_nome;
        this.data_saida = LocalDate.parse(data_saida, FMT);
        this.data_entrega = LocalDate.parse(data_entrega, FMT);
        this.statusEntrega = statusEntrega;
    }

    public int getQuantidadeEntregas() {
        return quantidadeEntregas;
    }

    public void setQuantidadeEntregas(int quantidadeEntregas) {
        this.quantidadeEntregas = quantidadeEntregas;
    }

    public String getCliente_nome() {
        return cliente_nome;
    }

    public void setCliente_nome(String cliente_nome) {
        this.cliente_nome = cliente_nome;
    }

    public String getMotorista_nome() {
        return motorista_nome;
    }

    public void setMotorista_nome(String motorista_nome) {
        this.motorista_nome = motorista_nome;
    }

    public String getNovoStatusEntrega() {
        return novoStatusEntrega;
    }

    public void setNovoStatusEntrega(String novoStatusEntrega) {
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public int getIdEntregaStatus() {
        return idEntregaStatus;
    }

    public void setIdEntregaStatus(int idEntregaStatus) {
        this.idEntregaStatus = idEntregaStatus;
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
