package Escola;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class SistemaEscolar {

    // Armazena o Nome e Matricula do aluno
    static HashMap<String, String> alunos = new HashMap<>();
    // Armazena as notas dos alunos por matrícula
    static HashMap<String, ArrayList<Double>> notasPorMatricula = new HashMap<>();
    static Scanner sc = new Scanner(System.in);

    // Getters e Setters (exemplo de uso, mas não utilizados neste contexto)
    private double nota;
    private String nome;
    private String matricula;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }
    // Fim dos Getters e Setters

    public static void main(String[] args) {
        while (true) {
            System.out.println("\nBem-vindo ao sistema escolar!");
            System.out.println("1 - Adicionar Aluno");
            System.out.println("2 - Adicionar Nota");
            System.out.println("3 - Calcular Média");
            System.out.println("4 - Listar Alunos");
            System.out.println("5 - Listar Notas de um Aluno");
            System.out.println("6 - Sair");
            System.out.print("Escolha uma opção: ");
            int opcao = lerInt();

            switch (opcao) {
                case 1:
                    adicionarAluno();
                    break;
                case 2:
                    adicionarNota();
                    break;
                case 3:
                    calcularMedia();
                    break;
                case 4:
                    listarAlunos();
                    break;
                case 5:
                    listarNotasAluno();
                    break;
                case 6:
                    System.out.println("Saindo do sistema...");
                    return;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }
    }

    public static void adicionarAluno() {
        sc.nextLine(); // Limpa buffer
        System.out.print("Qual seu nome?: ");
        String nome = sc.nextLine();
        System.out.print("Qual a sua matrícula?: ");
        String matricula = sc.nextLine();

        if (alunos.containsKey(nome) || alunos.containsValue(matricula)) {
            System.out.println("Aluno já cadastrado!");
            return;
        }

        alunos.put(nome, matricula);
        notasPorMatricula.put(matricula, new ArrayList<>());
        System.out.println("Aluno adicionado com sucesso!");
    }

    public static void adicionarNota() {
        sc.nextLine(); // Limpa buffer
        System.out.print("Digite a matrícula do aluno: ");
        String matricula = sc.nextLine();

        if (!notasPorMatricula.containsKey(matricula)) {
            System.out.println("Matrícula não encontrada.");
            return;
        }

        System.out.print("Digite a nota: ");
        double nota = lerDouble();

        notasPorMatricula.get(matricula).add(nota);
        System.out.println("Nota adicionada!");
    }

    public static void calcularMedia() {
        sc.nextLine(); // Limpa buffer
        System.out.print("Qual a matrícula do aluno?: ");
        String matriculaEscolha = sc.nextLine();

        if (!notasPorMatricula.containsKey(matriculaEscolha)) {
            System.out.println("Matrícula não encontrada.");
            return;
        }

        ArrayList<Double> notas = notasPorMatricula.get(matriculaEscolha);
        if (notas.isEmpty()) {
            System.out.println("Nenhuma nota cadastrada para este aluno.");
            return;
        }

        double soma = 0;
        for (double nota : notas) {
            soma += nota;
        }
        double media = soma / notas.size();
        System.out.println("A média do aluno é: " + media);
    }

    public static void listarAlunos() {
        if (alunos.isEmpty()) {
            System.out.println("Nenhum aluno cadastrado.");
            return;
        }
        System.out.println("Lista de alunos:");
        for (String nome : alunos.keySet()) {
            System.out.println("Nome: " + nome + " | Matrícula: " + alunos.get(nome));
        }
    }

    public static void listarNotasAluno() {
        sc.nextLine(); // Limpa buffer
        System.out.print("Digite a matrícula do aluno: ");
        String matricula = sc.nextLine();

        if (!notasPorMatricula.containsKey(matricula)) {
            System.out.println("Matrícula não encontrada.");
            return;
        }

        ArrayList<Double> notas = notasPorMatricula.get(matricula);
        if (notas.isEmpty()) {
            System.out.println("Nenhuma nota cadastrada para este aluno.");
            return;
        }

        System.out.println("Notas do aluno:");
        for (int i = 0; i < notas.size(); i++) {
            System.out.println("Nota " + (i + 1) + ": " + notas.get(i));
        }
    }

    // Métodos utilitários para leitura segura
    private static int lerInt() {
        while (!sc.hasNextInt()) {
            System.out.print("Digite um número válido: ");
            sc.next();
        }
        return sc.nextInt();
    }

    private static double lerDouble() {
        while (!sc.hasNextDouble()) {
            System.out.print("Digite um número válido: ");
            sc.next();
        }
        return sc.nextDouble();
    }
}