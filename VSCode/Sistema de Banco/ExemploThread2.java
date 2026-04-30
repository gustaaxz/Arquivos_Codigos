// Exemplo 2: Estendendo a classe Thread

class MinhaThread extends Thread {
    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                System.out.println("Executando a thread filha: " + i);
                // Pausa a execução por 500 milissegundos
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.err.println("A thread foi interrompida.");
        }
    }
}

public class ExemploThread2 {
    public static void main(String[] args) {
        // Cria uma instância da nossa própria classe de Thread
        MinhaThread minhaThread = new MinhaThread();

        // Inicia a thread
        minhaThread.start();

        // Código da thread principal continua executando em paralelo
        System.out.println("Thread principal finalizou sua tarefa imediata.");
    }
}