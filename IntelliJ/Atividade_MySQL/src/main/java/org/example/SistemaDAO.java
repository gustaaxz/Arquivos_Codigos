package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SistemaDAO {
    public void salvarCliente(Cliente cliente) throws SQLException {
        String command = """
                INSERT INTO Cliente
                (id, nome, cpf_cnpj, endereco, cidade, estado)
                VALUES
                (?,?,?,?,?,?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setInt(1, cliente.getId());
            stmt.setString(2, cliente.getNome());
            stmt.setString(3, cliente.getCpf_cnpj());
            stmt.setString(4, cliente.getEndereco());
            stmt.setString(5, cliente.getCidade());
            stmt.setString(6, cliente.getEstado());
            stmt.executeUpdate();
        }
    }

    public void salvarMotorista(Motorista motorista) throws SQLException {
        String command = """
                INSERT INTO Motorista
                (id, nome, cnh, veiculo, cidade_base)
                VALUES
                (?,?,?,?,?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)) {
            stmt.setInt(1, motorista.getId());
            stmt.setString(2, motorista.getNome());
            stmt.setString(3, motorista.getCnh());
            stmt.setString(4, motorista.getVeiculo());
            stmt.setString(5, motorista.getCidadebase());
            stmt.executeUpdate();
        }
    }

    public void excluirCliente(String cpf) throws SQLException {
        String sqlBuscaId = """
               SELECT id FROM Cliente WHERE cpf_cnpj = ?
               """;

        int clienteId = -1;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmtBusca = conn.prepareStatement(sqlBuscaId)) {

            stmtBusca.setString(1, cpf);
            var rs = stmtBusca.executeQuery();

            if (rs.next()) {
                clienteId = rs.getInt("id");
            }
        }

        if (clienteId != -1) {
            try (Connection conn = Conexao.conectar()) {
                // Deletar pedidos
                String sqlDelPedidos = "DELETE FROM Pedido WHERE cliente_id = ?";
                try (PreparedStatement stmtPed = conn.prepareStatement(sqlDelPedidos)) {
                    stmtPed.setInt(1, clienteId);
                    stmtPed.executeUpdate();
                }

                String sqlDelCliente = "DELETE FROM Cliente WHERE id = ?";
                try (PreparedStatement stmtCli = conn.prepareStatement(sqlDelCliente)) {
                    stmtCli.setInt(1, clienteId);
                    stmtCli.executeUpdate();
                }
            }
        } else {
            throw new SQLException("Cliente não encontrado com o CPF informado.");
        }
    }

    public void criarPedido (Pedido pedido) throws SQLException {
        String command = """
                INSERT INTO Pedido
                (cliente_id, data_pedido, volume_m3, peso_kg, statusPedido)
                VALUES
                (?,?,?,?,?);
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, pedido.getCliente_id());
            stmt.setObject(2, pedido.getData_pedido());
            stmt.setDouble(3, Double.parseDouble(pedido.getVolume_m3()));
            stmt.setDouble(4, Double.parseDouble(pedido.getPeso_kg()));
            stmt.setString(5, pedido.getStatusPedido());
            stmt.executeUpdate();
        }
    }

    public void registrarEventoEntrega(HistoricoEntrega historicoEntrega) throws SQLException {
        String command = """
                INSERT INTO HistoricoEntrega
                (id, entrega_id, data_evento, descricao)
                VALUES
                (?,?,?,?);
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, historicoEntrega.getId());
            stmt.setInt(2, historicoEntrega.getEntrega_id());
            stmt.setObject(3, historicoEntrega.getData_evento());
            stmt.setString(4, historicoEntrega.getDescricao());
            stmt.executeUpdate();
        }
    }

    public void atribuirPedidoMotorista(AtribuirPedidoMotorista atribuirPedidoMotorista) throws SQLException {
        String command = """
                INSERT INTO Entrega
                (id, pedido_id, motorista_id, data_saida, data_entrega, statusEntrega)
                VALUES
                (?,?,?,?,?,?);
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, atribuirPedidoMotorista.getId());
            stmt.setInt(2, atribuirPedidoMotorista.getPedido_id());
            stmt.setInt(3, atribuirPedidoMotorista.getMotorista_id());
            stmt.setObject(4, atribuirPedidoMotorista.getData_saida());
            stmt.setObject(5, atribuirPedidoMotorista.getData_entrega());
            stmt.setString(6, atribuirPedidoMotorista.getStatusEntrega());
            stmt.executeUpdate();
        }
    }

    public void buscarPedidoPorCpf(BuscarPedidoPorDoc buscarPedidoPorDoc) throws SQLException{
        String command = """
                SELECT Pedido.*, Cliente.cpf_cnpj
                FROM Pedido
                INNER JOIN Cliente ON Pedido.cliente_id = Cliente.id
                WHERE Cliente.cpf_cnpj = ?
                """;
        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setString(1, buscarPedidoPorDoc.getCliente_cpfcnpj());

            try(ResultSet rs = stmt.executeQuery()) {
                while(rs.next()){
                    int idPedido = rs.getInt("id");
                    String status = rs.getString("statusPedido");

                    System.out.println("Foi encontrado no CPF selecionado o ID do pedido: \nID: " + idPedido + " | Status: " + status);
                }
            }
        }
    }

    public void excluirEntrega(Entrega entrega) throws SQLException {
        String command = """
                DELETE FROM Pedido 
                WHERE id = ?;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, entrega.getId());
            stmt.executeUpdate();
        } catch (SQLException e){
            System.out.println("Erro ao excluir a entrega desejada!");
            e.printStackTrace();
        }
    }

    public void atualizarStatusEntrega(Entrega entrega) throws SQLException {
        String command = """
                UPDATE Entrega
                SET statusEntrega = ?
                WHERE id = ?;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setString(1, entrega.getNovoStatusEntrega());
            stmt.setInt(2, entrega.getIdEntregaStatus());
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("Erro ao atualizar o Status da Entrega.");
            e.printStackTrace();
        }
    }

    public void cancelarPedido (Pedido pedido) throws SQLException {
        String command = """
                DELETE FROM Pedido WHERE id = ?
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, pedido.getPedidoIdCancelar());
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Erro ao excluir o pedido!");
            e.printStackTrace();
        }
    }

    public void excluirMotoristaNoBanco(int idExclusao) throws SQLException {
        String sqlEntregas = "DELETE FROM Entrega WHERE motorista_id = ?";
        String sqlMotorista = "DELETE FROM Motorista WHERE id = ?";

        try (Connection conn = Conexao.conectar()) {
            conn.setAutoCommit(false);

            try (PreparedStatement stmtEnt = conn.prepareStatement(sqlEntregas);
                 PreparedStatement stmtMot = conn.prepareStatement(sqlMotorista)) {

                stmtEnt.setInt(1, idExclusao);
                stmtEnt.executeUpdate();

                stmtMot.setInt(1, idExclusao);
                int linhasAfetadas = stmtMot.executeUpdate();

                if (linhasAfetadas == 0) {
                    throw new SQLException("ID não encontrado.");
                }

                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        }
    }

    public void listarTodasEntregas(Entrega entrega) throws SQLException {
        String command = """
                SELECT
                    e.id, e.data_entrega, e.data_saida, e.statusEntrega,
                    c.nome AS nome_cliente,
                    m.nome AS nome_motorista
                FROM Entrega e
                INNER JOIN Pedido p ON e.pedido_id = p.id
                INNER JOIN Cliente c ON p.cliente_id = c.id
                INNER JOIN Motorista m ON e.motorista_id = m.id;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            ResultSet rs = stmt.executeQuery();
            List<Entrega> entregas = new ArrayList<>();
            while (rs.next()){
                int id = rs.getInt("e.id");
                String dataEn = rs.getString("e.data_entrega");
                String dataSa = rs.getString("e.data_saida");
                String statusEn = rs.getString("e.statusEntrega");
                String clienteNome = rs.getString("nome_cliente");
                String motoristaNome = rs.getString("nome_motorista");

                entregas.add(new Entrega(id, dataEn, dataSa, statusEn, clienteNome, motoristaNome));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar as entregas!");
            e.printStackTrace();
        }
    }

    public List<Entrega> relatorioEntregaPorMotorista() throws SQLException {
        List<Entrega> entregas = new ArrayList<>();
        String command = """
                SELECT e.pedido_id, m.nome AS nome_motorista, COUNT(e.id) AS quantidadeEntregas
                FROM Entrega e
                JOIN Motorista m ON e.motorista_id = m.id
                GROUP BY e.pedido_id, m.nome;
            """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("e.pedido_id");
                String nome_motorista = rs.getString("nome_motorista");
                int quantidadeEntregas = rs.getInt("quantidadeEntregas");

                entregas.add(new Entrega(id, nome_motorista, quantidadeEntregas));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao gerar relatório!");
            e.printStackTrace();
        }
        return entregas;
    }

    public List<Cliente> relatorioVolumePorCliente () throws SQLException {
        List<Cliente> clientesVolume = new ArrayList<>();
        String command = """
                SELECT c.id, c.nome, COUNT(e.id) AS quantidadePedidosCliente
                FROM Cliente c
                JOIN Entrega e ON e.pedido_id = pedido_id
                GROUP BY pedido_id, c.id, c.nome;
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("c.id");
                String nome_cliente = rs.getString("c.nome");
                int quantidadePedidosCliente = rs.getInt("quantidadePedidosCliente");

                clientesVolume.add(new Cliente(id, nome_cliente, quantidadePedidosCliente));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao gerar relatório!");
            e.printStackTrace();
        }
        return clientesVolume;
    }

    public List<Cliente> relatorioPendentesPorEstado () throws SQLException {
        /* Pedidos Pendentes por Estado */
        List<Cliente> clienteEstado = new ArrayList<>();
        String command = """
                SELECT COUNT(e.id) AS quantidadePedidosPendentes, e.statusEntrega, c.estado\s
                FROM Cliente c
                JOIN Pedido p ON p.cliente_id = c.id
                JOIN Entrega e ON e.pedido_id = p.id
                GROUP BY e.id, e.statusEntrega, c.estado;
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("quantidadePedidosPendentes");
                String statusEntrega = rs.getString("e.statusEntrega");
                String estadoCliente = rs.getString("c.estado");

                clienteEstado.add(new Cliente(id, statusEntrega, estadoCliente));
            }

        } catch (SQLException e) {
            System.out.println("Erro ao gerar relatório!");
            e.printStackTrace();
        }
        return clienteEstado;
    }

    public List<Cliente> relatorioAtrasosCidade() throws SQLException {
        List<Cliente> atrasosCidade = new ArrayList<>();
        String command = """
                SELECT c.cidade, COUNT(e.id) AS total_atrasos
                FROM Entrega e
                JOIN Pedido p ON e.pedido_id = p.id
                JOIN Cliente c ON p.cliente_id = c.id
                WHERE e.statusEntrega = 'Atrasado'
                GROUP BY c.cidade;
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                String cliente_cidade = rs.getString("c.cidade");
                int entrega_id = rs.getInt("total_atrasos");

                atrasosCidade.add(new Cliente(entrega_id, cliente_cidade));
            }

        } catch (SQLException e) {
            System.out.println("Erro ao gerar relatório!");
            e.printStackTrace();
        }
        return atrasosCidade;
    }

}


