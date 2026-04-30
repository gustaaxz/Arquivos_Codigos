package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SistemaDAO {
    public void cadastrarFornecedor(Fornecedor fornecedor) throws SQLException {
        String command = """
                INSERT INTO Fornecedor
                (nome, cnpj)
                VALUES
                (?, ?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setString(1, fornecedor.getNome());
            stmt.setString(2, fornecedor.getCnpj());
            stmt.executeUpdate();
        }
    }

    public Fornecedor buscarFornecedorPorId(int busca) throws SQLException {
        String query = """
                SELECT id, nome, cnpj
                FROM Fornecedor
                WHERE id = ?
                """;

        try(Connection conn = Conexao.conectar();
          PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, busca);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String cnpj = rs.getString("cnpj");

                Fornecedor fornecedor = new Fornecedor(id, nome, cnpj);

                return fornecedor;
            } else {
                throw new RuntimeException("ID do Fornecedor não encontrado!");
            }
        }
    }

    public List<Fornecedor> listarFornecedores() throws SQLException {
        String command = """
                SELECT id, nome, cnpj
                FROM Fornecedor;
                """;

        List<Fornecedor> fornecedores = new ArrayList<>();

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String cnpj = rs.getString("cnpj");

                fornecedores.add(new Fornecedor(id, nome, cnpj));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar todos os fornecedores!");
        } return fornecedores;
    }

    public Fornecedor atualizarFornecedor(Fornecedor fornecedor) throws SQLException {
        String command = """
            UPDATE Fornecedor
            SET nome = ?, cnpj = ?
            WHERE id = ?;
            """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {

            stmt.setString(1, fornecedor.getNome());
            stmt.setString(2, fornecedor.getCnpj());
            stmt.setInt(3, fornecedor.getId());

            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas == 0) {
                throw new RuntimeException("ID do Fornecedor não encontrado!");
            }

        } catch (SQLException e) {
            System.out.println("Erro ao atualizar os dados do Fornecedor!");
            e.printStackTrace();
            throw e;
        }

        return fornecedor;
    }

    public void deletarFornecedor(int id) throws SQLException {
        String command = """
            DELETE FROM Fornecedor
            WHERE id = ?
            """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(command)) {

            stmt.setInt(1, id);
            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas == 0) {
                throw new RuntimeException("ID do Fornecedor não encontrado!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Fornecedor!");
        }
    }

    public void cadastrarEquipamento(Equipamento equipamento) throws SQLException {
        String command = """
                INSERT INTO Equipamento
                (nome, numero_serie, fornecedor_id)
                VALUES
                (?, ?, ?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setString(1, equipamento.getNome());
            stmt.setString(2, equipamento.getNumero_serie());
            stmt.setInt(3, equipamento.getFornecedor_id());
            stmt.executeUpdate();
        }
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

                Equipamento equipamento = new Equipamento(id, fornecedor_id, numero_serie, nome);

                return equipamento;
            } else {
                throw new RuntimeException("ID do Equipamento não encontrado!");
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

                equipamentos.add(new Equipamento(id, fornecedor_id, numero_serie, nome));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar todos os equipamentos!");
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

                equipamentos.add(new Equipamento(id, fornecedor_id, numero_serie, nome));
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
            stmt.setString(2, equipamento.getNumero_serie());
            stmt.setInt(3, equipamento.getFornecedor_id());
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
                throw new RuntimeException("ID do Equipamento não encontrado!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Equipamento!");
        }
    }
}

