package ClientServer;
// Importações
// As importações trazem classes de bibliotecas externas para o seu código.
// A classe 'java.io' (Input/Output) lida com a leitura e escrita de dados.
// A classe 'java.net' (Networking) lida com a comunicação de rede.
import java.io.BufferedReader; // Usada para ler texto do cliente de forma eficiente.
import java.io.InputStreamReader; // Converte bytes de uma stream em caracteres.
import java.io.PrintWriter; // Usada para enviar texto para o cliente de forma eficiente.
import java.net.ServerSocket; // A classe principal para o lado do servidor, que "ouve" por conexões.
import java.net.Socket; // Representa a conexão entre o servidor e um cliente específico.


public class Server {
    public static void main(String[] args) {
        // Estrutura try-catch
        // O bloco 'try' contém o código que pode gerar uma exceção (um erro).
        // Se a exceção acontecer, o fluxo do programa vai para o bloco 'catch' em vez de parar.
        // O 'try-with-resources' garante que o 'ServerSocket' será fechado automaticamente ao final,
        // mesmo que ocorra um erro, liberando a porta.
        try (ServerSocket socketDoServidor = new ServerSocket(12345)) {

            System.out.println("Servidor iniciado e aguardando conexões na porta 12345...");

            // O método 'accept()' bloqueia a execução do programa e o faz esperar até que um cliente se
            // conecte. Quando a conexão acontece, ele retorna um objeto 'Socket'
            // que representa a comunicação com aquele cliente específico.
            Socket socketDoCliente = socketDoServidor.accept();
            System.out.println("Cliente conectado: " + socketDoCliente.getInetAddress().getHostAddress());

            // 'BufferedReader' é usado para ler dados que vêm do cliente.
            // 'InputStreamReader' converte os bytes recebidos em caracteres.
            //"Crie um leitor de texto eficiente (BufferedReader) que vai ler dados traduzidos-
            // para caracteres (InputStreamReader) de um fluxo de bytes (InputStream) que vem-
            // diretamente do socket do cliente."
            BufferedReader leitorDeEntrada = new BufferedReader(new InputStreamReader(socketDoCliente.getInputStream()));

            String inputLine = leitorDeEntrada.readLine();
            System.out.println("Mensagem do cliente: " + inputLine);

            // 'PrintWriter' é usado para enviar dados para o cliente.
            //Pense nela como a configuração de um "tubo de comunicação". Você está criando uma ferramenta-
            //(PrintWriter) para escrever mensagens de texto (escritor) e conectando-a à extremidade do tubo que-
            //sai do seu servidor e vai em direção ao cliente. O true no final apenas garante que, assim-
            //que você escrever uma mensagem, ela seja enviada imediatamente, sem demora.
            PrintWriter escritor = new PrintWriter(socketDoCliente.getOutputStream(), true);
            escritor.println("Olá, cliente! Sua mensagem foi recebida com sucesso.");

            // Os recursos ('streams' e 'sockets') são fechados para liberar a memória e a porta.
            leitorDeEntrada.close();
            escritor.close();
            socketDoCliente.close();

        } catch (Exception e) {
            // O bloco 'catch' é executado se uma exceção ocorrer no bloco 'try'.
            // O objeto 'e' contém informações sobre o erro, e 'e.printStackTrace()'
            // imprime um relatório completo para ajudar na depuração.
            System.out.println("Ocorreu um erro: " + e.getMessage());
            //e.printStackTrace();
        }
    }
}
