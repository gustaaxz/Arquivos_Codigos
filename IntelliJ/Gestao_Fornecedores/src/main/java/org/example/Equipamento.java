package org.example;

public class Equipamento {
    private int id, fornecedor_id;
    private String nome, numero_serie;

    public Equipamento(int id, int fornecedor_id, String nome, String numero_serie) {
        this.id = id;
        this.fornecedor_id = fornecedor_id;
        this.nome = nome;
        this.numero_serie = numero_serie;
    }

    public Equipamento(int fornecedor_id, String nome, String numero_serie) {
        this.fornecedor_id = fornecedor_id;
        this.nome = nome;
        this.numero_serie = numero_serie;
    }

    public Equipamento(String nome, String numero_serie, int fornecedor_id) {
        this.nome = nome;
        this.numero_serie = numero_serie;
        this.fornecedor_id = fornecedor_id;
    }

    public int getId() {
        return id;
    }

    public int getFornecedor_id() {
        return fornecedor_id;
    }

    public String getNome() {
        return nome;
    }

    public String getNumero_serie() {
        return numero_serie;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setFornecedor_id(int fornecedor_id) {
        this.fornecedor_id = fornecedor_id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setNumero_serie(String numero_serie) {
        this.numero_serie = numero_serie;
    }
}
