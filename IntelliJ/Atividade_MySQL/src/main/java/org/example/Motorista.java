package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Motorista {
    private String nome, cnh, veiculo, cidadebase, opcaoCerteza;
    private int id, idExclusao;

    public Motorista(int id, String nome, String cnh, String veiculo, String cidadebase) {
        this.id = id;
        this.nome = nome;
        this.cnh = cnh;
        this.veiculo = veiculo;
        this.cidadebase = cidadebase;
    }

    public Motorista(String nome, String cnh, String veiculo, String cidadebase) {
        this.nome = nome;
        this.cnh = cnh;
        this.veiculo = veiculo;
        this.cidadebase = cidadebase;
    }

    public Motorista (int idExclusao, String opcaoCerteza) {
        this.idExclusao = idExclusao;
        this.opcaoCerteza = opcaoCerteza;
    }

    public String getOpcaoCerteza() {
        return opcaoCerteza;
    }

    public int getIdExclusao() {
        return idExclusao;
    }

    public String getNome() {
        return nome;
    }

    public String getCnh() {
        return cnh;
    }

    public String getVeiculo() {
        return veiculo;
    }

    public String getCidadebase() {
        return cidadebase;
    }

    public int getId() {
        return id;
    }

    public void setOpcaoCerteza(String opcaoCerteza) {
        this.opcaoCerteza = opcaoCerteza;
    }

    public void setIdExclusao(int idExclusao) {
        this.idExclusao = idExclusao;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCidadebase(String cidadebase) {
        this.cidadebase = cidadebase;
    }

    public void setVeiculo(String veiculo) {
        this.veiculo = veiculo;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
