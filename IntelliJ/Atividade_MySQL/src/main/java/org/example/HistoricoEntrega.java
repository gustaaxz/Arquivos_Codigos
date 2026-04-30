package org.example;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class HistoricoEntrega {
    private int id, entrega_id, idEntregaStatus;
    private LocalDate data_evento;
    private String descricao, novoStatusEntrega;

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public HistoricoEntrega(int id, int entrega_id, String data_evento, String descricao) {
        this.id = id;
        this.entrega_id = entrega_id;
        this.data_evento = LocalDate.parse(data_evento, FMT);
        this.descricao = descricao;
    }

    public HistoricoEntrega(int entrega_id, String data_evento, String descricao) {
        this.entrega_id = entrega_id;
        this.data_evento = LocalDate.parse(data_evento, FMT);
        this.descricao = descricao;
    }

    public void NovoStatusEntrega(int entrega_id, String novoStatusEntrega) {
        this.entrega_id = entrega_id;
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public void NovoStatusEntrega(String novoStatusEntrega) {
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public HistoricoEntrega(String novoStatusEntrega, int idEntregaStatus) {
        this.idEntregaStatus = idEntregaStatus;
    }

    public int getId() {
        return id;
    }

    public int getEntrega_id() {
        return entrega_id;
    }

    public LocalDate getData_evento() {
        return data_evento;
    }

    public String getDescricao() {
        return descricao;
    }

    public int getIdEntregaStatus() {
        return idEntregaStatus;
    }

    public String getNovoStatusEntrega() {
        return novoStatusEntrega;
    }

    public void setIdEntregaStatus(int idEntregaStatus) {
        this.idEntregaStatus = idEntregaStatus;
    }

    public void setNovoStatusEntrega(String novoStatusEntrega) {
        this.novoStatusEntrega = novoStatusEntrega;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEntrega_id(int entrega_id) {
        this.entrega_id = entrega_id;
    }

    public void setData_evento(LocalDate data_evento) {
        this.data_evento = data_evento;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }


}
