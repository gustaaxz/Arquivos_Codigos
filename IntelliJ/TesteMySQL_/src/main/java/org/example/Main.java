package org.example;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) throws SQLException {
        inicio();
    }

    public static void inicio() throws SQLException {
        System.out.println("""
                1 - Cadastrar Contato 
                2 - Atualizar Contato
                3 - Buscar Contato
                4 - Excluir Contato
                5 - Buscar Por ID
                
                Digite a opção desejada:
                """);
        int opcao = sc.nextInt();
        sc.nextLine();

        switch (opcao) {
            case 1: {
                cadastrarContato();
                break;
            }

            case 2: {
                atualizarContato();
                break;
            }

            case 3 : {
                buscarContato();
                break;
            }

            case 4 : {
                deletarContato();
                break;
            }

            case 5 : {
                buscarPorMultiplosIDs();
            }
        }
    }

    public static void cadastrarContato() {
        System.out.println("Digite o nome do contato: ");
        String nome = sc.nextLine();

        System.out.println("Digite o número do contato: ");
        String numero = sc.nextLine();

        var dao = new ContatoDAO();
        try {
            dao.salvar(new Contato(nome, numero));
        } catch (SQLException e) {
            System.out.println("Erro ao acessar o banco de dados!");
            e.printStackTrace();
        }
    }

    public static void atualizarContato() {
        List<Contato> contatos = new ArrayList<>();
        List<Integer> idContatos = new ArrayList<>();
        var contatoDao = new ContatoDAO();

        try {
            contatos = contatoDao.listarContatos();
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar: " + e.getMessage());
            e.printStackTrace();
        }

        for (Contato contato : contatos) {
            System.out.println("ID: " + contato.getId());
            System.out.println("NOME: " + contato.getNome());
            System.out.println("NUMERO: " + contato.getNumero());

            idContatos.add(contato.getId());
        }

        System.out.println("Digite o ID do contato que deseja alterar: ");
        int id = sc.nextInt();
        sc.nextLine();

        String nome = "";
        String numero = "";
        if (idContatos.contains(id)) {
            System.out.println("Digite o novo nome: ");
            nome = sc.nextLine();

            System.out.println("Digite o novo número: ");
            numero = sc.nextLine();
        }
        try {
            contatoDao.atualizarContato(new Contato(id, nome, numero));
        } catch (SQLException e) {
            System.out.println("Erro ao acessar o banco de dados!");
            e.printStackTrace();
        }
    }

    public static void buscarContato() {
        System.out.println("Digite o nome (ou parte dele) para buscar:");
        String busca = sc.nextLine();

        var contatoDao = new ContatoDAO();
        try {
            List<Contato> resultados = contatoDao.buscarContato(busca);

            if (resultados.isEmpty()) {
                System.out.println("Nenhum contato encontrado.");
            } else {
                for (Contato c : resultados) {
                    System.out.println("ID: " + c.getId() + " - NOME: " + c.getNome() + " : NÚMERO: " + c.getNumero());
                }
            }
        } catch (SQLException e) {
            System.out.println("Erro na busca do contato!");
            e.printStackTrace();
        }
    }

    public static void deletarContato() throws SQLException {
        List<Contato> contatos = new ArrayList<>();
        List<Integer> idContatos = new ArrayList<>();
        var contatoDao = new ContatoDAO();

        contatos = contatoDao.listarContatos();

        for(Contato contato : contatos) {
            System.out.println("ID: " + contato.getId());
            System.out.println("NOME: "+ contato.getNome());
            System.out.println("NUMERO: " + contato.getNumero());

            idContatos.add(contato.getId());
        }

        System.out.println("\nDigite o ID do contato que deseja excluir: ");
        int id = sc.nextInt();
        sc.nextLine();

        try {
            contatoDao.excluirContato(id);
            System.out.println("\nContato excluído com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao excluir contato!");
            e.printStackTrace();
        }
    }

    public static void buscarPorMultiplosIDs() {
        Scanner sc = new Scanner(System.in);

        try {
            ContatoDAO contatoDao = new ContatoDAO();
            List<Contato> listaParaBusca = new ArrayList<>();

            System.out.println("Quais IDs deseja procurar? (Ex: 1, 3, 5)");
            String idsString = sc.nextLine();

            String[] partes = idsString.split(",");

            for (String p : partes) {
                String valor = p.trim();
                if (!valor.isEmpty()) {
                    listaParaBusca.add(new Contato(Integer.parseInt(valor)));
                }
            }

            List<Contato> contatosEncontrados = contatoDao.buscarIdContato(listaParaBusca);

            System.out.println("\n--- Contatos Consultados ---");
            if (contatosEncontrados.isEmpty()) {
                System.out.println("Nenhum registro encontrado.");
            } else {
                for (Contato c : contatosEncontrados) {
                    System.out.println("ID: " + c.getId() + " - Nome: " + c.getNome() + " - Contato: " + c.getNumero() );
                }
            }

        } catch (NumberFormatException e) {
            System.out.println("Erro: Entrada inválida. Digite apenas números.");
        } catch (SQLException e) {
            System.out.println("Erro no banco de dados!");
            e.printStackTrace();
        }
    }
}

/* Scanner sc = new Scanner(System.in);
Inicia o objeto que "escuta" o que o usuário digita no console. */

/* ContatoDAO contatoDao = new ContatoDAO();
Instancia a classe que contém as regras de conexão e comandos SQL (SELECT) para o MySQL. */

/* String[] partes = idsString.split(",");
Divide a linha de texto em vários pedaços, usando a vírgula como separador para permitir buscas múltiplas. */

/* String valor = p.trim();
Limpa espaços vazios que o usuário possa ter digitado por engano entre os números e as vírgulas. */

/* listaParaBusca.add(new Contato(Integer.parseInt(valor)));
Converte o texto "123" em número inteiro e o coloca dentro de um objeto Contato para ser enviado ao banco. */

/* contatoDao.buscarIdContato(listaParaBusca);
Envia a lista de IDs para o banco de dados e recebe de volta os objetos Contato preenchidos com Nomes e Telefones. */

/* catch (NumberFormatException e)
Captura o erro caso o usuário tente buscar algo que não seja um número (ex: buscar por "ID letra A"). */

/* catch (SQLException e)
Captura falhas de comunicação com o banco de dados, como senha errada ou servidor MySQL offline. */