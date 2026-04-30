package senai.repository.equipamento;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import senai.database.Conexao;
import senai.model.Equipamento;

public class EquipamentoRepositoryImpl {
    public Equipamento criarEquipamento(Equipamento equipamento) throws SQLException {
        String command = """
                INSERT INTO Equipamento
                (nome, numero_serie, fornecedor_id)
                VALUES
                (?, ?, ?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command, Statement.RETURN_GENERATED_KEYS)){
            stmt.setString(1, equipamento.getNome());
            stmt.setString(2, equipamento.getNumeroSerie());
            stmt.setInt(3, equipamento.getFornecedorId());
            stmt.executeUpdate();

            try (ResultSet keys = stmt.getGeneratedKeys()) {
                if (keys.next()) {
                    equipamento.setId(keys.getInt(1));
                }
            }
        }
        return equipamento;
    }

    public Equipamento buscarEquipamentoPorId(int busca) throws SQLException {
        String query = """
                SELECT id, nome, numero_serie, fornecedor_id
                FROM Equipamento
                WHERE id = ?
                """;

        try(Connection conn = Conexao.conectar();
          PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, busca);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String numero_serie = rs.getString("numero_serie");
                int fornecedor_id = rs.getInt("fornecedor_id");

                Equipamento equipamento = new Equipamento(id, nome, numero_serie, fornecedor_id);

                return equipamento;
            } else {
                throw new RuntimeException("Id do Equipamento não encontrado!");
            }
        }
    }

    public List<Equipamento> listarTodosEquipamentos() throws SQLException {
        String command = """
                SELECT id, nome, numero_serie, fornecedor_id
                FROM Equipamento;
                """;

        List<Equipamento> equipamentos = new ArrayList<>();

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String numero_serie = rs.getString("numero_serie");
                int fornecedor_id = rs.getInt("fornecedor_id");

                equipamentos.add(new Equipamento(id, nome, numero_serie, fornecedor_id));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar todos os equipamentos!");
            e.printStackTrace();
        }
        return equipamentos;
    }

    public List<Equipamento> listarEquipamentosPorFornecedor(int idFornecedor) throws SQLException {
        String command = """
                SELECT id, nome, numero_serie, fornecedor_id
                FROM Equipamento
                WHERE fornecedor_id = ?;
                """;

        List<Equipamento> equipamentos = new ArrayList<>();

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, idFornecedor);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String numero_serie = rs.getString("numero_serie");
                int fornecedor_id = rs.getInt("fornecedor_id");

                equipamentos.add(new Equipamento(id, nome, numero_serie, fornecedor_id));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar equipamentos do fornecedor!");
        } 
        return equipamentos;
    }

    public Equipamento atualizarEquipamento(Equipamento equipamento) throws SQLException {
         String command = """
            UPDATE Equipamento
            SET nome = ?, numero_serie = ?, fornecedor_id = ?
            WHERE id = ?;
            """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {

            stmt.setString(1, equipamento.getNome());
            stmt.setString(2, equipamento.getNumeroSerie());
            stmt.setInt(3, equipamento.getFornecedorId());
            stmt.setInt(4, equipamento.getId());

            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas == 0) {
                throw new RuntimeException("ID do Equipamento não encontrado!");
            }

        } catch (SQLException e) {
            System.out.println("Erro ao atualizar os dados do Equipamento!");
            e.printStackTrace();
        }
        return equipamento;
    }

    public void deletarEquipamento(int id) throws SQLException {
        String command = """
            DELETE FROM Equipamento
            WHERE id = ?
            """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {

            stmt.setInt(1, id);
            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas == 0) {
                throw new RuntimeException("Equipamento não encontrado para exclusão!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Equipamento!");
        }
    }
}
