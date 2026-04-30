package repository.Trabalhador;

import java.sql.SQLException;
import java.util.List;

import model.Trabalhador;

public interface TrabalhadorRepository {
    public Trabalhador cadastrarTrabalhador(Trabalhador trabalhador) throws SQLException;
    public Trabalhador buscarTrabalhadorPeloId(int id) throws SQLException;
    public List<Trabalhador> listarTodosTrabalhadores() throws SQLException;
    public Trabalhador atualizarTrabalhador(Trabalhador trabalhador) throws SQLException;
    public void deletarTrabalhador(int id) throws SQLException;
    public List<Trabalhador> buscarTrabalhadorPorCpf(String cpf) throws SQLException;
}
