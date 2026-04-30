package service.Trabalhador;

import java.sql.SQLException;
import java.util.List;

import model.Trabalhador;
import repository.Trabalhador.TrabalhadorRepositoryImpl;



public class TrabalhadorServiceImpl implements TrabalhadorService {

    private static final TrabalhadorRepositoryImpl trabalhadorRepository = new TrabalhadorRepositoryImpl();
    
    @Override
    public Trabalhador cadastrarTrabalhador(Trabalhador trabalhador) throws SQLException {
         return trabalhadorRepository.cadastrarTrabalhador(trabalhador);
    }

    @Override
    public Trabalhador buscarTrabalhadorPorId(int id) throws SQLException {
        return trabalhadorRepository.buscarTrabalhadorPeloId(id);
    }

    @Override
    public Trabalhador atualizarTrabalhador(Trabalhador trabalhador) throws SQLException {
        return trabalhadorRepository.atualizarTrabalhador(trabalhador);
    }

    @Override
    public Trabalhador deletarTrabalhador(int id) throws SQLException {
        trabalhadorRepository.verificarSeTrabalhadorExiste(id);
        return trabalhadorRepository.deletarTrabalhador(id);
    }

    @Override
    public List<Trabalhador> buscarTrabalhadorPorCpf(String cpf) throws SQLException {
        return trabalhadorRepository.buscarTrabalhadorPorCpf(cpf);
    }

    @Override
    public Trabalhador verificarSeTrabalhadorExiste(int id) throws SQLException {
        throw new UnsupportedOperationException("Unimplemented method 'verificarSeTrabalhadorExiste'");
    }
}
