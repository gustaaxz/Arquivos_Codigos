package repository.Equipamento;

import database.Conexao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Equipamento;

public class EquipamentoRepositoryImpl {
    public Equipamento cadastrarEquipamento(Equipamento equipamento) throws SQLException {
        String command = """        
                INSERT INTO Equipamento
                (id, nome, numero_serie, trabalhador_id)
                VALUES
                (?,?,?,?)
                """;
        
        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command, Statement.RETURN_GENERATED_KEYS)){
                stmt.setInt(1, equipamento.getId());
                stmt.setString(2, equipamento.getNome());
                stmt.setString(3, equipamento.getNumero_serie());
                stmt.setInt(4, equipamento.getTrabalhador_id());
                stmt.executeUpdate();
            }
            catch (SQLException e) {
                System.out.println("Erro ao cadastrar o equipamento!");
                e.printStackTrace();
            }
        return equipamento;
    }

    public Equipamento buscarEquipamentoPeloId(int busca) throws SQLException{
        String query = """
                SELECT id, nome, tipo, numero_serie, trabalhador_id
                FROM Equipamento
                WHERE id = ?
                """;

        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
                stmt.setInt(1, busca);
                ResultSet rs = stmt.executeQuery();
                if(rs.next()){
                    int id = rs.getInt("id");
                    String nome = rs.getString("nome");
                    String tipo = rs.getString("tipo");
                    String numero_serie = rs.getString("numero_serie");
                    int trabalhador_id = rs.getInt("trabalhador_id");

                    Equipamento equipamento = new Equipamento(nome, tipo, numero_serie, id, trabalhador_id);

                    return equipamento;
                } else {
                    throw new RuntimeException("Erro ao pesquisar o equipamento.");
                }
            }
    }

    public List<Equipamento> listarTodosEquipamentos() throws SQLException {
        List<Equipamento> equipamentos = new ArrayList<>();
        String query = """
                SELECT id, nome, tipo, numero_serie, trabalhador_id
                FROM Equipamento
                """;

        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(query)){
                ResultSet rs = stmt.executeQuery();
                while (rs.next()){
                    int id = rs.getInt("id");
                    String nome = rs.getString("nome");
                    String tipo = rs.getString("tipo");
                    String numero_serie = rs.getString("numero_serie");
                    int trabalhador_id = rs.getInt("trabalhador_id");

                    equipamentos.add(new Equipamento(nome, tipo, numero_serie, id, trabalhador_id));
                }
            }
            catch (SQLException e) {
                throw new RuntimeException("Erro ao listar todos os equipamentos!");
            } return equipamentos;
    }

    public Equipamento atualizarEquipamento(Equipamento equipamento) throws SQLException {
        String command = """
                UPDATE Equipamento
                SET nome = ?, tipo = ?, numero_serie = ?, trabalhador_id = ?
                WHERE id = ?
                """;          
                
        try (Connection conn = Conexao.conectar();
            PreparedStatement stmt = conn.prepareStatement(command)){
                stmt.setString(1, equipamento.getNome());
                stmt.setString(2, equipamento.getTipo());
                stmt.setString(3, equipamento.getNumero_serie());
                stmt.setInt(4, equipamento.getTrabalhador_id());
                stmt.setInt(5, equipamento.getId());

                int linhasAfetadas = stmt.executeUpdate();

                if(linhasAfetadas == 0) {
                    throw new RuntimeException("ID do equipamento não encontrado!");
                }}

        catch (SQLException e ) {
            System.out.println("Erro ao atualizar os dados do equipamento!");
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
            PreparedStatement stmt = conn.prepareStatement(command)){
                stmt.setInt(1, id);

                int linhasAfetadas = stmt.executeUpdate();

                if (linhasAfetadas == 0) {
                    throw new RuntimeException("ID do equipamento não encontrado!");
                }
            }
        catch (SQLException e) {
            System.out.println("Erro ao deletar o equipamento!");
            e.printStackTrace();
        }
    }

    public List<Equipamento> listarEquipamentoPorTrabalhador(int trabalhador_id) throws SQLException {
        List<Equipamento> equipamentos = new ArrayList<>();
        String query = """
                SELECT id, nome, tipo, numero_serie
                FROM Equipamento
                WHERE trabalhador_id = ?
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, trabalhador_id);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String nome = rs.getString("nome");
                String tipo = rs.getString("tipo");
                String numero_serie = rs.getString("numero_serie");

                equipamentos.add(new Equipamento(nome, tipo, numero_serie, id, trabalhador_id));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar os equipamentos do trabalhador!");
            e.printStackTrace();
        }
        return equipamentos;
    }

    public Equipamento buscarEquipamentoPorNumeroSerie(String numero_serie) throws SQLException {
        String query = """
                SELECT id, nome, tipo, numero_serie, trabalhador_id 
                FROM Equipamento 
                WHERE numero_serie = ?      
                """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, numero_serie);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return new Equipamento(
                    rs.getString("nome"),
                    rs.getString("tipo"),
                    rs.getString("numero_serie"),
                    rs.getInt("id"),
                    rs.getInt("trabalhador_id")
                );
            }
        } catch (SQLException e) {
            System.out.println("Erro ao buscar o equipamento pelo número de série!");
            e.printStackTrace();
        }
        return null;
    }
}
