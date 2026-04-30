package org.example;

public class Cliente {
    private int id, quantidadePedidosCliente;
    private String nome, cpf_cnpj, endereco, cidade, estado, nome_cliente, estadoCliente, statusEntrega;

    public Cliente(int id, String nome, String cpf_cnpj, String endereco, String cidade, String estado) {
        this.id = id;
        this.nome = nome;
        this.cpf_cnpj = cpf_cnpj;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
    }

    public Cliente(String nome, String cpf_cnpj, String endereco, String cidade, String estado) {
        this.nome = nome;
        this.cpf_cnpj = cpf_cnpj;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
    }


    public Cliente(int exclusaoPorCPF) {

    }

    public Cliente(String exclusaoPorCPF) {

    }

    public Cliente(int id, String nome_cliente){
        this.id = id;
        this.nome = nome_cliente;
    }

    public Cliente(int id, String nome_cliente, int quantidadePedidosCliente) {
        this.id = id;
        this.nome_cliente = nome_cliente;
        this.quantidadePedidosCliente = quantidadePedidosCliente;
    }

    public Cliente(int id, String statusEntrega, String estadoCliente) {
        this.statusEntrega = statusEntrega;
        this.estadoCliente = estadoCliente;
    }

    public String getNome_cliente() {
        return nome_cliente;
    }

    public int getQuantidadePedidosCliente() {
        return quantidadePedidosCliente;
    }

    public void setQuantidadePedidosCliente(int quantidadePedidosCliente) {
        this.quantidadePedidosCliente = quantidadePedidosCliente;
    }

    public void setNome_cliente(String nome_cliente) {
        this.nome_cliente = nome_cliente;
    }

    public String getEstadoCliente() {
        return estadoCliente;
    }

    public void setEstadoCliente(String estadoCliente) {
        this.estadoCliente = estadoCliente;
    }

    public String getStatusEntrega() {
        return statusEntrega;
    }

    public void setStatusEntrega(String statusEntrega) {
        this.statusEntrega = statusEntrega;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCpf_cnpj() {
        return cpf_cnpj;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf_cnpj(String cpf_cnpj) {
        this.cpf_cnpj = cpf_cnpj;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
