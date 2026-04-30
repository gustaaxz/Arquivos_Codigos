package repository.Trabalhador;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import database.Conexao;
import model.Trabalhador;

public class TrabalhadorRepositoryImpl {
    public Trabalhador cadastrarTrabalhador(Trabalhador trabalhador) throws SQLException {
        String command = """
                INSERT INTO Trabalhador
                (id, nome, cpf, cnpj)
                VALUES
                (?,?,?,?)
                """;

        try (Connection conn = Conexao.conectar();
                PreparedStatement stmt = conn.prepareStatement(command, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, trabalhador.getId());
            stmt.setString(2, trabalhador.getNome());
            stmt.setString(3, trabalhador.getCpf());
            stmt.setString(4, trabalhador.getCnpj());
            stmt.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println("Erro ao cadastrar trabalhador!");
            e.printStackTrace();
        }
        return trabalhador;
    }

    public Trabalhador buscarTrabalhadorPeloId(int busca) throws SQLException{
        String query = """
                SELECT id, nome, cpf, cnpj
                FROM Trabalhador
                WHERE id = ?
                """;

        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
                stmt.setInt(1, busca);
                ResultSet rs = stmt.executeQuery();
                if(rs.next()){
                    String nome = rs.getString("nome");
                    String cpf = rs.getString("cpf");
                    String cnpj = rs.getString("cnpj");

                    Trabalhador trabalhador = new Trabalhador(nome, cpf, cnpj);

                    return trabalhador;
                } else {
                    throw new RuntimeException("Erro ao pesquisar o trabalhador.");
                }
            }
        
    }   

    public List<Trabalhador> listarTodosTrabalhadores() throws SQLException {
        List<Trabalhador> trabalhadores = new ArrayList<>();
        String query = """
                SELECT id, nome, cpf, cnpj
                FROM Trabalhador
                """;

        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
                ResultSet rs = stmt.executeQuery();
                while (rs.next()){
                    String nome = rs.getString("nome");
                    String cpf = rs.getString("cpf");
                    String cnpj = rs.getString("cnpj");

                    trabalhadores.add(new Trabalhador(nome, cpf, cnpj));
                }
            }
            catch (SQLException e) {
                throw new RuntimeException("Erro ao listar todos os trabalhadores!");
            } return trabalhadores;
    }

    public Trabalhador atualizarTrabalhador(Trabalhador trabalhador) throws SQLException {
        String command = """
                UPDATE Trabalhador
                SET nome = ?, cpf = ?, cnpj = ?
                WHERE id = ?
                """;          
                
        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
                stmt.setString(1, trabalhador.getNome());
                stmt.setString(2, trabalhador.getCpf());
                stmt.setString(3, trabalhador.getCnpj());
                stmt.setInt(4, trabalhador.getId());

                int linhasAfetadas = stmt.executeUpdate();

                if(linhasAfetadas == 0) {
                    throw new RuntimeException("ID do trabalhador não encontrado!");
                }}

        catch (SQLException e ) {
            System.out.println("Erro ao atualizar os dados do trabalhador!");
            e.printStackTrace();
        }
        return trabalhador;
    }

    public Trabalhador deletarTrabalhador(int id) throws SQLException {
        String command = """
                DELETE FROM Trabalhador
                WHERE id = ?
                """;

        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
                stmt.setInt(1, id);

                int linhasAfetadas = stmt.executeUpdate();

                if (linhasAfetadas == 0) {
                    throw new RuntimeException("ID do trabalhador não encontrado!");
                }
            }
        catch (SQLException e) {
            System.out.println("Erro ao deletar o trabalhador!");
            e.printStackTrace();
        }
        return null;
    }

    public List<Trabalhador> buscarTrabalhadorPorCpf(String cpf) throws SQLException {
        List<Trabalhador> trabalhadores = new ArrayList<>();
        String query = """
                SELECT id, nome, cpf, cnpj
                FROM Trabalhador
                WHERE cpf = ?
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, cpf);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String cnpj = rs.getString("cnpj");

                trabalhadores.add(new Trabalhador(nome, cpf, cnpj, id));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar os trabalhadores!");
            e.printStackTrace();
        }
        return trabalhadores;
    }

    public boolean verificarSeTrabalhadorExiste(int id) throws SQLException {
        String query = """
                SELECT COUNT(*) 
                FROM Trabalhador
                WHERE id = ?
                """;
        
        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
                stmt.setInt(1, id);
                ResultSet rs = stmt.executeQuery();

                if(rs.next()){
                    return rs.getInt(1) > 0;
                }
            }
        catch (SQLException e) {
            System.out.println("Erro ao verificar se o trabalhador existe!");
            e.printStackTrace();
        }
        return false;
    }
}
