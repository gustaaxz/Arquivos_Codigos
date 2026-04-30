import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;
import model.Equipamento;
import model.Trabalhador;
import service.Equipamento.EquipamentoServiceImpl;
import service.Trabalhador.TrabalhadorServiceImpl;

public class Main {
    private static final Scanner sc = new Scanner(System.in);
    private static final TrabalhadorServiceImpl trabalhadorService = new TrabalhadorServiceImpl();
    private static final EquipamentoServiceImpl equipamentoService = new EquipamentoServiceImpl();

    public static void main(String[] args) {
        int opcao = -1;

        while (opcao != 0) {
            exibirMenu();
            System.out.print("Escolha uma opção: ");
            opcao = sc.nextInt();
            sc.nextLine(); // Limpar buffer

            try {
                switch (opcao) {
                    case 1 -> cadastrarTrabalhador();
                    case 2 -> cadastrarEquipamento();
                    case 3 -> buscarTrabalhadorPorId();
                    case 4 -> buscarTrabalhadorPorCpf();
                    case 5 -> atualizarTrabalhador();
                    case 6 -> atualizarEquipamento();
                    case 7 -> deletarTrabalhador();
                    case 8 -> deletarEquipamento();
                    case 9 -> listarTodosEquipamentos();
                    case 10 -> listarEquipamentosPorTrabalhador();
                    case 11 -> buscarEquipamentoPorNumeroSerie();
                    case 12 -> verificarSeTrabalhadorExiste();
                    case 0 -> System.out.println("Saindo do sistema...");
                    default -> System.out.println("Opção inválida!");
                }
            } catch (SQLException e) {
                System.err.println("Erro no banco de dados: " + e.getMessage());
            }
        }
    }

    private static void exibirMenu() {
        System.out.println("""
                
                --- Sistema de Gerenciamento de Equipamentos e Trabalhadores ---
                1 - Cadastrar Trabalhador
                2 - Cadastrar Equipamento
                3 - Buscar Trabalhador por ID
                4 - Buscar Trabalhador por CPF
                5 - Atualizar Trabalhador
                6 - Atualizar Equipamento
                7 - Deletar Trabalhador
                8 - Deletar Equipamento
                9 - Listar todos os equipamentos
                10 - Listar Equipamentos por Trabalhador
                11 - Buscar Equipamentos por Número de Série
                12 - Verificar se Trabalhador Existe
                0 - Sair do Sistema
                """);
    }

    private static void cadastrarTrabalhador() throws SQLException {
        System.out.println("\n--- Cadastro de Trabalhador ---");
        System.out.print("Nome: ");
        String nome = sc.nextLine();
        System.out.print("CPF: ");
        String cpf = sc.nextLine();
        System.out.print("CNPJ: ");
        String cnpj = sc.nextLine();

        trabalhadorService.cadastrarTrabalhador(new Trabalhador(nome, cpf, cnpj));
        System.out.println("Trabalhador cadastrado com sucesso!");
    }

    private static void cadastrarEquipamento() throws SQLException {
        System.out.println("\n--- Cadastro de Equipamento ---");
        System.out.print("Nome: ");
        String nome = sc.nextLine();
        System.out.print("Tipo: ");
        String tipo = sc.nextLine();
        System.out.print("Número de Série: ");
        String serie = sc.nextLine();
        System.out.print("ID do Trabalhador Responsável: ");
        int trabId = sc.nextInt();

        equipamentoService.cadastrarEquipamento(new Equipamento(nome, tipo, serie, trabId));
        System.out.println("Equipamento cadastrado com sucesso!");
    }

    private static void buscarTrabalhadorPorId() throws SQLException {
        System.out.print("Digite o ID: ");
        int id = sc.nextInt();
        Trabalhador t = trabalhadorService.buscarTrabalhadorPorId(id);
        System.out.println(t != null ? t : "Trabalhador não encontrado.");
    }

    private static void buscarTrabalhadorPorCpf() throws SQLException {
        System.out.print("Digite o CPF: ");
        String cpf = sc.nextLine();
        List<Trabalhador> lista = trabalhadorService.buscarTrabalhadorPorCpf(cpf);
        if (lista.isEmpty()) System.out.println("Nenhum trabalhador encontrado.");
        else lista.forEach(System.out::println);
    }

    private static void atualizarTrabalhador() throws SQLException {
        System.out.print("ID do trabalhador a atualizar: ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Novo Nome: ");
        String nome = sc.nextLine();
        System.out.print("Novo CPF: ");
        String cpf = sc.nextLine();
        System.out.print("Novo CNPJ: ");
        String cnpj = sc.nextLine();

        trabalhadorService.atualizarTrabalhador(new Trabalhador(nome, cpf, cnpj, id));
        System.out.println("Trabalhador atualizado!");
    }

    private static void atualizarEquipamento() throws SQLException {
        System.out.print("ID do equipamento a atualizar: ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Novo Nome: ");
        String nome = sc.nextLine();
        System.out.print("Novo Tipo: ");
        String tipo = sc.nextLine();
        System.out.print("Novo Número de Série: ");
        String serie = sc.nextLine();

        equipamentoService.atualizarEquipamento(new Equipamento(nome, tipo, serie, id, 0));
        System.out.println("Equipamento atualizado!");
    }

    private static void deletarTrabalhador() throws SQLException {
        System.out.print("ID do trabalhador a deletar: ");
        int id = sc.nextInt();
        trabalhadorService.deletarTrabalhador(id);
        System.out.println("Trabalhador deletado!");
    }

    private static void deletarEquipamento() throws SQLException {
        System.out.print("ID do equipamento a deletar: ");
        int id = sc.nextInt();
        equipamentoService.deletarEquipamento(id);
        System.out.println("Equipamento deletado!");
    }

    private static void listarTodosEquipamentos() throws SQLException {
        equipamentoService.listarTodosEquipamentos().forEach(System.out::println);
    }

    private static void listarEquipamentosPorTrabalhador() throws SQLException {
        System.out.print("ID do trabalhador: ");
        int id = sc.nextInt();
        equipamentoService.listarEquipamentoPorTrabalhador(id).forEach(System.out::println);
    }

    private static void buscarEquipamentoPorNumeroSerie() throws SQLException {
        System.out.print("Número de Série: ");
        String serie = sc.nextLine();
        Equipamento e = equipamentoService.buscarEquipamentoPorNumeroSerie(serie);
        System.out.println(e != null ? e : "Equipamento não encontrado.");
    }

    private static void verificarSeTrabalhadorExiste() throws SQLException {
        System.out.print("ID do trabalhador: ");
        int id = sc.nextInt();
        boolean existe = trabalhadorService.verificarSeTrabalhadorExiste(id) != null;
        System.out.println(existe ? "O trabalhador existe." : "O trabalhador NÃO existe.");
    }
}
