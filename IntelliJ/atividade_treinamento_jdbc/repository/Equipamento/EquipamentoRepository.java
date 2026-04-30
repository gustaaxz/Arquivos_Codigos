package repository.Equipamento;

import java.sql.SQLException;
import java.util.List;

import model.Equipamento;

public interface EquipamentoRepository {
    public Equipamento cadastrarEquipamento(Equipamento equipamento) throws SQLException;
    public Equipamento buscarEquipamentoPeloId(int id) throws SQLException;
    public List<Equipamento> listarTodosEquipamentos() throws SQLException;
    public Equipamento atualizarEquipamento(Equipamento equipamento) throws SQLException;
    public void deletarEquipamento(int id) throws SQLException;
    public List<Equipamento> listarEquipamentoPorTrabalhador(int trabalhador_id) throws SQLException;
    public Equipamento buscarEquipamentoPorNumeroSerie(String numero_serie) throws SQLException;
}
