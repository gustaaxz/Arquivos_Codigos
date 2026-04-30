package senai.repository.fornecedor;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import senai.database.Conexao;
import senai.model.Fornecedor;

public class FornecedorRepositoryImpl {
    public Fornecedor cadastrarFornecedor(Fornecedor fornecedor) throws SQLException {
        String command = """
                INSERT INTO Fornecedor
                (nome, cnpj)
                VALUES
                (?, ?)
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command, Statement.RETURN_GENERATED_KEYS)){
            stmt.setString(1, fornecedor.getNome());
            stmt.setString(2, fornecedor.getCnpj());
            stmt.executeUpdate();

            try (ResultSet keys = stmt.getGeneratedKeys()) {
                if (keys.next()) {
                    fornecedor.setId(keys.getInt(1));
                }
            }
        }
        return fornecedor;
    }

    public Fornecedor buscarFornecedorPorId(int id) throws SQLException {
        String command = """
                SELECT id, nome, cnpj
                FROM Fornecedor
                WHERE id = ?;
                """;

        try(Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                String nome = rs.getString("nome");
                String cnpj = rs.getString("cnpj");
            
                return new Fornecedor(id, nome, cnpj);
            } else {
                throw new RuntimeException("Id do Fornecedor não encontrado!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao buscar o fornecedor por ID!");
            e.printStackTrace();
        }
        return null;
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
                throw new RuntimeException("Id do fornecedor não encontrado!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar os dados do Fornecedor!");
            e.printStackTrace();
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
                throw new RuntimeException("Id do Fornecedor não encontrado!");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao deletar o Fornecedor!");
        }
    }
}
