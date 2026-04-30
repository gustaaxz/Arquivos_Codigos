package ClientServer;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client2 {
    public static void main(String[] args) {
        try {
            // Conectando ao servidor
            Socket socket = new Socket("localhost", 12345);
            System.out.println("Conectado ao servidor.");

            // Enviando mensagem para o servidor
            PrintWriter escritor = new PrintWriter(socket.getOutputStream(), true);
            escritor.println("Sou o segundo cliente servidor!");

            // Lendo a resposta do servidor
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String response = in.readLine();
            System.out.println("Resposta do servidor: " + response);

            // Fechando os recursos
            in.close();
            escritor.close();
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
