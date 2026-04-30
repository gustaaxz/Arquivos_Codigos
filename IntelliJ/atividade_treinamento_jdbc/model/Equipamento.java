package model;

public class Equipamento {
    private String nome, tipo, numero_serie;
    private int id, trabalhador_id;

    public Equipamento(String nome, String tipo, String numero_serie, int trabalhador_id) {
        this.nome = nome;
        this.tipo = tipo;
        this.numero_serie = numero_serie;
        this.trabalhador_id = trabalhador_id;
    }
    public Equipamento(String nome, String tipo, String numero_serie, int id, int trabalhador_id) {
        this.nome = nome;
        this.tipo = tipo;
        this.numero_serie = numero_serie;
        this.trabalhador_id = trabalhador_id;
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNumero_serie() {
        return numero_serie;
    }

    public void setNumero_serie(String numero_serie) {
        this.numero_serie = numero_serie;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTrabalhador_id() {
        return trabalhador_id;
    }

    public void setTrabalhador_id(int trabalhador_id) {
        this.trabalhador_id = trabalhador_id;
    }
}
