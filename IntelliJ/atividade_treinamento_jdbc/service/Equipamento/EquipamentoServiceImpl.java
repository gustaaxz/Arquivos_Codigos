package service.Equipamento;

import java.sql.SQLException;
import java.util.List;

import model.Equipamento;
import repository.Equipamento.EquipamentoRepositoryImpl;

public class EquipamentoServiceImpl implements EquipamentoService {

    private static final EquipamentoRepositoryImpl equipamentoRepository = new EquipamentoRepositoryImpl();

    @Override
    public Equipamento cadastrarEquipamento(Equipamento equipamento) throws SQLException {
        return equipamentoRepository.cadastrarEquipamento(equipamento);
    }

    @Override
    public List<Equipamento> listarTodosEquipamentos() throws SQLException {
        return equipamentoRepository.listarTodosEquipamentos();
    }

    @Override
    public Equipamento atualizarEquipamento(Equipamento equipamento) throws SQLException {
        return equipamentoRepository.atualizarEquipamento(equipamento);
    }

    @Override
    public void deletarEquipamento(int id) throws SQLException {
        equipamentoRepository.deletarEquipamento(id);
    }

    @Override
    public List<Equipamento> listarEquipamentoPorTrabalhador(int trabalhador_id) throws SQLException {
        return equipamentoRepository.listarEquipamentoPorTrabalhador(trabalhador_id);
    }

    @Override
    public Equipamento buscarEquipamentoPorNumeroSerie(String numero_serie) throws SQLException {
        return equipamentoRepository.buscarEquipamentoPorNumeroSerie(numero_serie);
    }
}
