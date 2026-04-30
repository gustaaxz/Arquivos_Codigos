package org.example;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("""
                - Sistema de Gestão de Fornecedores e Equipamentos -

                1 - Cadastrar Fornecedor
                2 - Cadastrar Equipamento
                3 - Buscar Fornecedor por ID
                4 - Buscar Equipamento por ID
                5 - Listar Todos os Fornecedores
                6 - Listar Todos os Equipamentos por ID do Fornecedor
                7 - Atualizar Fornecedor
                8 - Atualizar Equipamento
                9 - Deletar Fornecedor
                10 - Deletar Equipamento

                Escreva:
                """);

        int opcao = sc.nextInt();

        switch (opcao) {
            case 1: {
                cadastrarFornecedor();
                break;
            }

            case 2: {
                cadastrarEquipamento();
                break;
            }

            case 3: {
                buscarFornecedorPorId();
                break;
            }

            case 4: {
                buscarEquipamentoPorId();
                break;
            }

            case 5: {
                listarTodosFornecedores();
                break;
            }

            case 6: {
                listarEquipamentosPeloIdFornecedor();
                break;
            }

            case 7: {
                atualizarFornecedor();
                break;
            }

            case 8: {
                atualizarEquipamento();
                break;
            }

            case 9: {
                deletarFornecedor();
                break;
            }

            case 10: {
                deletarEquipamento();
                break;
            }
        }
    }

    public static void cadastrarFornecedor() {
        System.out.println("Qual o nome do Fornecedor que deseja cadastrar?: ");
        sc.nextLine();
        String nome = sc.nextLine();

        System.out.println("Qual o CNPJ do Fornecedor que deseja cadastrar?: ");
        String cnpj = sc.nextLine();

        var dao = new SistemaDAO();

        try {
            dao.cadastrarFornecedor(new Fornecedor(nome, cnpj));
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar um Fornecedor!");
            e.printStackTrace();
        }
    }

    public static void buscarFornecedorPorId() {
        Fornecedor fornecedor = null;
        System.out.println("Qual o ID do Fornecedor que deseja buscar?: ");
        int buscaId = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            fornecedor = dao.buscarFornecedorPorId(buscaId);
        } catch (SQLException e) {
            System.out.println("ID do Fornecedor não encontrado!");
            e.printStackTrace();
        }
        if (fornecedor != null) {
            System.out.println("id | nome | cnpj");
            System.out.println(fornecedor.getId() + " | " + fornecedor.getNome() + " | " + fornecedor.getCnpj());
        } else {
            System.out.println("O ID do Fornecedor é inexistente!");
        }
    }

    public static void listarTodosFornecedores() {
        List<Fornecedor> listarTodosFornecedores = new ArrayList<>();
        var dao = new SistemaDAO();

        try {
            listarTodosFornecedores = dao.listarFornecedores();
        } catch (SQLException e) {
            System.out.println("Erro ao listar todos os fornecedores!");
        }

        System.out.println("id | nome | cnpj");
        for (Fornecedor f : listarTodosFornecedores) {
            System.out.println(f.getId() + " | " + f.getNome() + " | " + f.getCnpj());
        }
    }

    public static void atualizarFornecedor() {
        var dao = new SistemaDAO();

        System.out.println("Qual o ID do Fornecedor que deseja atualizar?");
        int id = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual o novo nome?");
        String nome = sc.nextLine();

        System.out.println("Qual o novo CNPJ?");
        String cnpj = sc.nextLine();

        Fornecedor fornecedorAtualizado = new Fornecedor(id, nome, cnpj);

        try {
            dao.atualizarFornecedor(fornecedorAtualizado);
            System.out.println("Fornecedor atualizado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar o Fornecedor.");
        }
    }

    public static void deletarFornecedor() {
        System.out.println("Qual o ID do Fornecedor que deseja deletar?: ");
        sc.nextLine();
        int idFornecedorDeletar = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            dao.deletarFornecedor(idFornecedorDeletar);
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Fornecedor!");
            ;
        }
    }

    public static void cadastrarEquipamento() {
        sc.nextLine();
        System.out.println("Qual o nome do equipamento que deseja cadastrar?: ");
        String nomeEquipamentoCadastro = sc.nextLine();

        System.out.println("Qual o número de série do equipamento?: ");
        String numeroSerieEquipamentoCadastro = sc.nextLine();

        System.out.println("Qual o ID do Fornecedor que deseja ligar ao equipamento?: ");
        int idFornecedorEquipamentoCadastro = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            dao.cadastrarEquipamento(new Equipamento(nomeEquipamentoCadastro, numeroSerieEquipamentoCadastro,
                    idFornecedorEquipamentoCadastro));
            System.out.println("Equipamento cadastrado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar o Equipamento!");
        }
    }

    public static void buscarEquipamentoPorId() {
        System.out.println("Qual o ID do Equipamento que deseja buscar?: ");
        int idEquipamentoBusca = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            Equipamento equipamento = dao.buscarEquipamentoPorId(idEquipamentoBusca);
            System.out.println("id | nome | numero_serie | fornecedor_id");
            System.out.println(equipamento.getId() + " | " + equipamento.getNome() + " | " + equipamento.getNumero_serie() + " | " + equipamento.getFornecedor_id());
        } catch (SQLException e) {
            System.out.println("Erro ao buscar o Equipamento!");
        }
    }

    public static void listarEquipamentosPeloIdFornecedor() {
        System.out.println("Qual o ID do Fornecedor que deseja listar os equipamentos?: ");
        int idFornecedorListar = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            List<Equipamento> equipamentos = dao.listarTodosEquipamentos();
            System.out.println("id | nome | numero_serie | fornecedor_id");
            for (Equipamento e : equipamentos) {
                System.out.println(e.getId() + " | " + e.getNome() + " | " + e.getNumero_serie() + " | " + e.getFornecedor_id());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar os Equipamentos do Fornecedor!");
        }
    }

    public static void atualizarEquipamento() {
        var dao = new SistemaDAO();

        System.out.println("Qual o ID do Equipamento que deseja atualizar?");
        int idEquipamento = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual o novo nome do Equipamento?");
        String nomeEquipamento = sc.nextLine(); 

        System.out.println("Qual o novo número de série do Equipamento?");
        String numeroSerieEquipamento = sc.nextLine();

        System.out.println("Qual o novo ID do Fornecedor do Equipamento?");
        int idFornecedorEquipamento = sc.nextInt();

        Equipamento equipamentoAtualizado = new Equipamento(idEquipamento, idFornecedorEquipamento, numeroSerieEquipamento, nomeEquipamento);
        try {
            dao.atualizarEquipamento(equipamentoAtualizado);
            System.out.println("Equipamento atualizado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar o Equipamento.");
        }
    }

    public static void deletarEquipamento() {
        System.out.println("Qual o ID do Equipamento que deseja deletar?: ");
        sc.nextLine();
        int idEquipamentoDeletar = sc.nextInt();

        var dao = new SistemaDAO();

        try {
            dao.deletarEquipamento(idEquipamentoDeletar);
            System.out.println("Equipamento deletado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Equipamento!");
        }
    }
}