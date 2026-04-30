package org.example.service;

import org.example.model.Produto;

import java.sql.SQLException;
import java.util.List;

public class ProdutoServiceImpl implements ProdutoService{

    @Override
    public Produto cadastrarProduto(Produto produto) throws SQLException {
        return null;
    }

    @Override
    public List<Produto> listarProdutos() throws SQLException {
        return List.of();
    }

    @Override
    public Produto buscarPorId(int id) throws SQLException {
        return null;
    }

    @Override
    public Produto atualizarProduto(Produto produto, int id) throws SQLException {
        return null;
    }

    @Override
    public boolean excluirProduto(int id) throws SQLException {
        return false;
    }
}
