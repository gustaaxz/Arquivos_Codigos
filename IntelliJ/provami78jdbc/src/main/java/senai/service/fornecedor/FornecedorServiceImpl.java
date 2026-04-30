package senai.service.fornecedor;

import senai.model.Fornecedor;
import senai.repository.fornecedor.FornecedorRepositoryImpl;

import java.sql.SQLException;
import java.util.List;

public class FornecedorServiceImpl implements FornecedorService {
    private FornecedorRepositoryImpl repository = new FornecedorRepositoryImpl();

    @Override
    public Fornecedor criarFornecedor(Fornecedor fornecedor) throws SQLException {
        return repository.cadastrarFornecedor(fornecedor);
    }

    @Override
    public Fornecedor buscarPorId(int id) throws SQLException {
        return repository.buscarFornecedorPorId(id);
    }

    @Override
    public List<Fornecedor> buscarTodos() throws SQLException {
        return repository.listarFornecedores();
    }

    @Override
    public void atualizarFornecedor(Fornecedor fornecedor) throws SQLException {
        repository.atualizarFornecedor(fornecedor);
    }

    @Override
    public void deletarFornecedor(int id) throws SQLException {
        repository.deletarFornecedor(id);
    }
}
