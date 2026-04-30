package service.Trabalhador;

import java.sql.SQLException;
import java.util.List;

import model.Trabalhador;

public interface TrabalhadorService {
    public Trabalhador cadastrarTrabalhador(Trabalhador trabalhador) throws SQLException;
    public Trabalhador buscarTrabalhadorPorId(int id) throws SQLException;
    public Trabalhador atualizarTrabalhador(Trabalhador trabalhador) throws SQLException;
    public Trabalhador deletarTrabalhador(int id) throws SQLException;
    public List<Trabalhador> buscarTrabalhadorPorCpf(String cpf) throws SQLException;
    public Trabalhador verificarSeTrabalhadorExiste(int id) throws SQLException;
}
