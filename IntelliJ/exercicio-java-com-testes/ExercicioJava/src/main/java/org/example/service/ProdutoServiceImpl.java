package org.example.service;

import org.example.model.Produto;
import org.example.repository.ProdutoRepositoryImpl;

import java.sql.SQLException;
import java.util.List;

public class ProdutoServiceImpl implements ProdutoService{

    private final ProdutoRepositoryImpl produtoService = new ProdutoRepositoryImpl();

    @Override
    public Produto cadastrarProduto(Produto produto) throws SQLException {
        return produtoService.save(produto);
    }

    @Override
    public List<Produto> listarProdutos() throws SQLException {
        return produtoService.findAll();
    }

    @Override
    public Produto buscarPorId(int id) throws SQLException {
        return produtoService.findById(id);
    }

    @Override
    public Produto atualizarProduto(Produto produto, int id) throws SQLException {
        produto.setId(id);
        return produtoService.update(produto);
    }

    @Override
    public boolean excluirProduto(int id) throws SQLException {
        Produto p = produtoService.findById(id);

        if (p != null) {
            produtoService.deleteById(id);
            return true;
        }
        return false;
    }
}
