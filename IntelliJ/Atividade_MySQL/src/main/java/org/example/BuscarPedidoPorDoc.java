package org.example;

public class BuscarPedidoPorDoc {
    private int id_cliente;
    private String cliente_cpfcnpj;

    public BuscarPedidoPorDoc(int id_cliente, String cliente_cpfcnpj) {
        this.id_cliente = id_cliente;
        this.cliente_cpfcnpj = cliente_cpfcnpj;
    }

    public BuscarPedidoPorDoc(String cliente_cpfcnpj) {
        this.cliente_cpfcnpj = cliente_cpfcnpj;
    }

    public int getId_cliente() {
        return id_cliente;
    }

    public String getCliente_cpfcnpj() {
        return cliente_cpfcnpj;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public void setCliente_cpfcnpj(String cliente_cpfcnpj) {
        this.cliente_cpfcnpj = cliente_cpfcnpj;
    }
}
