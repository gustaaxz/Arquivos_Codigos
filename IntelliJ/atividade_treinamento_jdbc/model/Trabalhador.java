package model;

public class Trabalhador {
    private String nome, cpf, cnpj;
    private int id;

    public Trabalhador(String nome, String cpf, String cnpj) {
        this.nome = nome;
        this.cpf = cpf;
        this.cnpj = cnpj;
    }

    public Trabalhador(String nome, String cpf, String cnpj, int id) {
        this.nome = nome;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getCpf() {
        return cpf;
    }
    
    public void setCpf(String cpf) {
        this.cpf = cpf;
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
