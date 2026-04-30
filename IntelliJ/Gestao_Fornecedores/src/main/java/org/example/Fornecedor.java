package org.example;

public class Fornecedor {
    private int id;
    private String nome, cnpj, novoNome, novoCnpj;

    public Fornecedor(int id, String nome, String cnpj) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
    }

    public Fornecedor(String nome, String cnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
    }

    public Fornecedor(int id, String nome, String cnpj, String novoNome, String novoCnpj) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.novoNome = novoNome;
        this.novoCnpj = novoCnpj;
    }

    public Fornecedor(String nome, String cnpj, String novoNome, String novoCnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.novoNome = novoNome;
        this.novoCnpj = novoCnpj;
    }

    public Fornecedor(int idAtualizarFuncionario) {
    }

    public String getNovoNome() {
        return novoNome;
    }

    public void setNovoNome(String novoNome) {
        this.novoNome = novoNome;
    }

    public String getNovoCnpj() {
        return novoCnpj;
    }

    public void setNovoCnpj(String novoCnpj) {
        this.novoCnpj = novoCnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
