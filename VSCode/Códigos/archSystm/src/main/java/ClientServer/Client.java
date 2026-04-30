package ClientServer;

// Importações
import java.io.BufferedReader; // Lê texto de forma eficiente.
import java.io.InputStreamReader; // Converte bytes em caracteres.
import java.io.PrintWriter; // Envia texto de forma eficiente.
import java.net.Socket; // Representa a conexão do lado do cliente.

public class Client {
    public static void main(String[] args) {
        // Estrutura try-catch
        // 'try-with-resources' garante que o 'socket' e os 'streams'
        // serão fechados automaticamente, mesmo que ocorra um erro.
        try (Socket socketDoCliente = new Socket("localhost", 12345)) {

            System.out.println("Conectado ao servidor.");

            // 'PrintWriter' é usado para enviar dados ao servidor.
            PrintWriter escritor = new PrintWriter(socketDoCliente.getOutputStream(), true);

            escritor.println("Olá, Servidor!");

            // 'BufferedReader' é usado para ler a resposta que vem do servidor.
            BufferedReader leitorDeEntrada = new BufferedReader(new InputStreamReader(socketDoCliente.getInputStream()));

            //Em resumo, essa linha diz: "Leia a próxima linha de texto que o servidor enviar e guarde-a na variável
            String respostaDoServidor = leitorDeEntrada.readLine(); //readLine(): Este é o método que lê uma linha de texto
            // completa do fluxo de entrada. A execução do programa do cliente pausa nesta linha e espera até
            // que o servidor envie uma mensagem e termine com uma quebra de linha.
            System.out.println("Resposta do servidor: " + respostaDoServidor);

            // Os recursos são fechados automaticamente pela estrutura 'try-with-resources'.
            leitorDeEntrada.close();
            escritor.close();

        } catch (Exception e) {
            // Este 'catch' lida com erros de conexão, por exemplo, se o servidor
            // não estiver rodando no momento da tentativa.
            System.out.println("Ocorreu um erro: " + e.getMessage());
            //e.printStackTrace();
        }
    }
}
