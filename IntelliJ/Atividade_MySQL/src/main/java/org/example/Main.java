package org.example;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) throws SQLException {
        inicio();
    }

    public static void inicio() throws SQLException {
        System.out.println("""
                --- Sistema de Logística ---\n
                1 - Cadastrar Cliente
                2 - Cadastrar Motorista
                3 - Criar Pedido
                4 - Atribuir Pedido a Motorista (Gerar Entrega)
                5 - Registrar Evento de Entrega (Histórico)
                6 - Atualizar Status da Entrega
                7 - Listar Todas as Entregas com Cliente e Motorista
                8 - Relatórios Sistema
                9 - Buscar Pedido por Documento
                10 - Cancelar Pedido
                11 - Excluir Entrega (com validação)
                12 - Excluir Cliente (com verificação de dependência)
                13 - Excluir Motorista (com verificação de dependência)
                0 - Sair
               
                Escolha uma opção: 
                """);

        int opcao = sc.nextInt();
        sc.nextLine();

        switch (opcao){
            case 1: {
                cadastrarCliente();
                break;
            }

            case 2: {
                cadastrarMotorista();
                break;
            }

            case 3: {
                criarPedido();
                break;
            }

            case 4: {
                atribuirPedido();
                break;
            }

            case 5: {
                registrarEventoEntrega();
                break;
            }

            case 6: {
                atualizarStatusEntrega();
                break;
            }

            case 7: {
                listarEntregas();
                break;
            }

            case 8: {
                relatorioSistema();
                break;
            }

            case 9: {
                buscarPedidoPorDocumento();
                break;
            }

            case 10: {
                cancelarPedido();
                break;
            }

            case 11: {
                excluirEntrega();
                break;
            }

            case 12: {
                excluirCliente();
                break;
            }

            case 13: {
                excluirMotorista();
                break;
            }

            case 0: {
                System.exit(0);
            }
        }
    }

    public static void cadastrarCliente() {
        System.out.println("Qual o nome do Cliente que deseja cadastrar?: ");
        String clienteNome = sc.nextLine();

        System.out.println("Qual o CPF/CNPJ do Cliente?: ");
        String clienteCpf_cnpj = sc.nextLine();

        System.out.println("Qual o endereço do Cliente?: ");
        String clienteEndereco = sc.nextLine();

        System.out.println("Qual a cidade do Cliente?: ");
        String clienteCidade = sc.nextLine();

        System.out.println("Qual o estado do Cliente?: ");
        String clienteEstado = sc.nextLine();

        var cadastrarCliente = new SistemaDAO();

        try{
            cadastrarCliente.salvarCliente(new Cliente(clienteNome, clienteCpf_cnpj, clienteEndereco, clienteCidade, clienteEstado));
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar um cliente.");
            e.printStackTrace();
        }
    }

    public static void cadastrarMotorista() {
        System.out.println("Qual o nome do Motorista que deseja cadastrar?: ");
        String motoristaNome = sc.nextLine();

        System.out.println("Qual a CNH do Motorista que deseja cadastrar?: ");
        String motoristaCnh = sc.nextLine();

        System.out.println("Qual o veículo que o Motorista dirige?: ");
        String motoristaCarro = sc.nextLine();

        System.out.println("Qual a Cidade Base que o Motorista se desloca?: ");
        String motoristaCidadeBase = sc.nextLine();

        var cadastrarMotorista = new SistemaDAO();

        try{
            cadastrarMotorista.salvarMotorista(new Motorista(motoristaNome, motoristaCnh, motoristaCarro, motoristaCidadeBase));
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar um cliente.");
            e.printStackTrace();
        }
    }

    public static void criarPedido() {
        System.out.println("Qual o ID do Cliente?: ");
        int pedidoIDCliente = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual a Data do pedido? (dd/mm/aaaa): ");
        String pedidoData = sc.nextLine();

        System.out.println("Qual o tamanho do pedido?: ");
        String pedidoTamanhom3 = sc.nextLine();

        System.out.println("Qual o peso do pedido?: ");
        String pedidoPeso = sc.nextLine();

        System.out.println("Qual o Status do pedido?: ");
        String pedidoStatus = sc.nextLine();

        var criarPedido = new SistemaDAO();

        try {
            criarPedido.criarPedido(new Pedido(pedidoIDCliente, pedidoData, pedidoTamanhom3, pedidoPeso, pedidoStatus));
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar novo pedido!");
            e.printStackTrace();
        }
    }

    public static void atribuirPedido() throws SQLException {
        /* Atribuir Pedido ao Motorista (Gerar Entrega) */

        System.out.println("Qual o ID do pedido que deseja atribuir ao motorista?: ");
        int pedidoIDproMotorista = sc.nextInt();

        System.out.println("Qual o ID do motorista que deseja atribuir o pedido?: ");
        int atribuirIDMotorista = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual a data de saída do pedido?: ");
        String dataSaidaPedido = sc.nextLine();

        System.out.println("Qual a data de entrega do pedido?: ");
        String dataEntregaPedido = sc.nextLine();

        System.out.println("Qual o status da entrega?: ");
        String statusEntrega = sc.nextLine();

        var atribuirPedido = new SistemaDAO();

        try {
            atribuirPedido.atribuirPedidoMotorista((new AtribuirPedidoMotorista(pedidoIDproMotorista, atribuirIDMotorista, dataSaidaPedido, dataEntregaPedido, statusEntrega)));
        } catch (SQLException e) {
            System.out.println("Erro ao atribuir o pedido ao motorista!");
            e.printStackTrace();
        }
    }

    public static void registrarEventoEntrega() {
        /* Registrar Evento de Entrega (Histórico) */

        System.out.println("Qual o ID da Entrega?: ");
        Integer entregaID = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual a data da Entrega?: ");
        String data_evento = sc.nextLine();

        System.out.println("Descrição da entrega: ");
        String descricao = sc.nextLine();

        var registrarEventoEntrega = new SistemaDAO();

        try {
            registrarEventoEntrega.registrarEventoEntrega(new HistoricoEntrega(entregaID, data_evento, descricao));
        } catch (SQLException e) {
            System.out.println("Erro ao verificar o histórico do pedido.");
            e.printStackTrace();
        }
    }

    public static void atualizarStatusEntrega() {
        System.out.println("Qual o ID da entrega que deseja atualizar o STATUS?: ");
        int idEntregaStatus = sc.nextInt();
        sc.nextLine();

        System.out.println("Qual o novo STATUS que deseja inserir ao pedido?: ");
        String novoStatusEntrega = sc.nextLine();

        var NovoStatusEntrega = new SistemaDAO();

        try {
            NovoStatusEntrega.atualizarStatusEntrega(new Entrega(idEntregaStatus, novoStatusEntrega));
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar o Status da Entrega.");
            e.printStackTrace();
        }
    }

    public static void listarEntregas() {
        /* Listar Todas as Entregas com Cliente e Motorista */

        System.out.println("Qual o ID da Entrega?: ");
        Integer historicoIDEntrega = sc.nextInt();

        var listarEntregas = new SistemaDAO();

        try {
            listarEntregas.listarTodasEntregas(new Entrega(historicoIDEntrega));
        } catch (SQLException e) {
            System.out.println("Ocorreu um erro ao listar as entregas!");
            e.printStackTrace();
        }
    }

    public static void relatorioSistema() throws SQLException {
        /* Listar Todas as Entregas com Cliente e Motorista */

        System.out.println("""
                --- Menu de Relatórios ---
                1 - Total de Entregas por Motorista
                2 - Clientes com Maior Volume Entregue
                3 - Pedidos Pendentes por Estado
                4 - Entregas Atrasadas por Cidade
                0 - Voltar
                
                Escolha o relatório: 
                """);

        int opcaorelatorio = sc.nextInt();
        sc.nextLine();

        switch(opcaorelatorio) {
            case 1 : {
                relatorioEntregasPorMotorista();
                break;
            }

            case 2 : {
                relatorioVolumePorCliente();
                break;
            }

            case 3 : {
                relatorioPendentesPorEstado();
                break;
            }

            case 4 : {
                relatorioAtrasosPorCidade();
                break;
            }

            case 0 : {
                inicio();
                break;
            }
        }
        sc.close();
    }

    private static void relatorioEntregasPorMotorista() {
        var relatorioEntregasPorMotorista = new SistemaDAO();
        List<Entrega> entregas = new ArrayList<>();

        try {
            entregas = relatorioEntregasPorMotorista.relatorioEntregaPorMotorista();
        } catch (SQLException e) {
            System.out.println("Erro ao gerar o relatório!");
            e.printStackTrace();
        }
        System.out.println("pedido_id | nome motorista | quantidadeEntregas");

        for(Entrega entrega : entregas){
            System.out.println(entrega.getPedido_id() + " | " + entrega.getMotorista_nome() + " | " + entrega.getQuantidadeEntregas());
        }
    }

    private static void relatorioVolumePorCliente() {
        /* Clientes com o maior volume de pedidos entregues */
        var relatorioVolumeClientes = new SistemaDAO();
        List<Cliente> clientesVolume = new ArrayList<>();

        try {
            clientesVolume = relatorioVolumeClientes.relatorioVolumePorCliente();
        } catch (SQLException e) {
            System.out.println("Erro ao gerar o relatório!");
        }
        System.out.println("id | nome cliente | quantidadeEntregasCliente");

        for(Cliente cliente : clientesVolume) {
            System.out.println(cliente.getId() + " | " + cliente.getNome_cliente() + " | " + cliente.getQuantidadePedidosCliente());
        }
    }

    private static void relatorioPendentesPorEstado() {
        var relatorioPedidoPendenteEstado = new SistemaDAO();
        List<Cliente> clienteEstado = new ArrayList<>();

        try {
            clienteEstado = relatorioPedidoPendenteEstado.relatorioPendentesPorEstado();
        } catch (SQLException e) {
            System.out.println("Erro ao gerar o relatório!");
            e.printStackTrace();
        }

        for(Cliente cliente : clienteEstado) {
            System.out.println(cliente.getQuantidadePedidosCliente() + " | " + cliente.getStatusEntrega() + " | " + cliente.getEstadoCliente());
        }
    }

    private static void relatorioAtrasosPorCidade() throws SQLException {
        /* Entregas Atrasadas por Cidade */
        var relatorioAtrasosPorCidade = new SistemaDAO();
        List<Cliente> atrasosPorCidade = new ArrayList<>();

        try {
            atrasosPorCidade = relatorioAtrasosPorCidade.relatorioAtrasosCidade();
        } catch (SQLException e) {
            System.out.println("Erro ao gerar o relatório!");
            e.printStackTrace();
        }

        for(Cliente cliente : atrasosPorCidade) {
            System.out.println(cliente.getCidade() + " | " + cliente.getStatusEntrega());
        }
    }

    public static void buscarPedidoPorDocumento() throws SQLException {
        System.out.println("Qual documento deseja usar? (CPF/CNPJ): ");
        String escolhaDocumento = sc.nextLine();
        String documento = "";

        if(escolhaDocumento.equalsIgnoreCase("CPF")) {
            System.out.println("Qual o CPF do Cliente?: ");
            documento = sc.nextLine();
        } else if (escolhaDocumento.equalsIgnoreCase("CNPJ")){
            System.out.println("Qual o CNPJ do Cliente?: ");
            documento = sc.nextLine();
        } else {
            System.out.println("Opção inválida.");
            return;
        }

        var buscarPedidoPorDoc = new SistemaDAO();

        try {
            buscarPedidoPorDoc.buscarPedidoPorCpf(new BuscarPedidoPorDoc(documento));
        } catch (SQLException e){
            System.out.println("Erro ao procurar o pedido!");
            e.printStackTrace();
        }
    }

    public static void cancelarPedido() {
        System.out.println("Qual o ID do pedido que deseja cancelar?: ");
        int pedidoIdCancelar = sc.nextInt();
        sc.nextLine();

        var cancelarPedido = new SistemaDAO();

        try {
            cancelarPedido.cancelarPedido(new Pedido(pedidoIdCancelar));
        } catch (SQLException e) {
            System.out.println("Erro ao cancelar o pedido!");
            e.printStackTrace();
        }
    }

    public static void excluirEntrega() throws SQLException {
        System.out.println("Qual o ID da entrega que deseja excluir?: ");
        int idEntregaExclusao = sc.nextInt();
        sc.nextLine();

        System.out.println("Você deseja realmente excluir essa entrega? (Sim/Não): ");
        String escolhaExclusao = sc.nextLine();

        if(escolhaExclusao.equalsIgnoreCase("Não")){
            System.out.println("A exclusão não foi confirmada.");
        } else if (escolhaExclusao.equalsIgnoreCase("Sim")){
            var exclusaoEntrega = new SistemaDAO();

            try {
                exclusaoEntrega.excluirEntrega(new Entrega(idEntregaExclusao));
            } catch (SQLException e){
                System.out.println("Erro na exclusão do pedido!");
                e.printStackTrace();
            }
        }
    }

    public static void excluirCliente() {
        System.out.println("Qual o CPF do Cliente que você deseja excluir?: ");
        String cpfExclusao = sc.nextLine();

        System.out.println("Você tem certeza que deseja excluir esse cliente e TODOS os seus pedidos? \n(S - Sim; N - Não): ");
        String opcaoCerteza = sc.nextLine();

        if (opcaoCerteza.equalsIgnoreCase("S")) {
            var excluirCliente = new SistemaDAO();
            try {
                excluirCliente.excluirCliente(cpfExclusao);
                System.out.println("Cliente e seus pedidos excluídos com sucesso!");
            } catch (SQLException e) {
                System.out.println("Erro ao excluir: " + e.getMessage());
            }
        } else {
            System.out.println("Operação cancelada. O cliente não foi excluído.");
        }
    }

    public static void excluirMotorista() {
        System.out.println("Qual o ID do Motorista que você deseja excluir?: ");
        int idExclusao = sc.nextInt();
        sc.nextLine();

        System.out.println("Confirmar exclusão e de todas as entregas? (S/N): ");
        String opcaoCerteza = sc.nextLine();

        if (opcaoCerteza.equalsIgnoreCase("S")) {
            SistemaDAO dao = new SistemaDAO();
            try {
                dao.excluirMotoristaNoBanco(idExclusao);
                System.out.println("Excluído com sucesso!");
            } catch (SQLException e) {
                System.err.println("Erro: " + e.getMessage());
            }
        } else {
            System.out.println("Operação cancelada.");
        }
    }
}