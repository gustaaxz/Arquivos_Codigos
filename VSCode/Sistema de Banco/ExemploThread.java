// Exemplo 1: Implementando a interface Runnable (forma recomendada)

class MeuRunnable implements Runnable {
    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                System.out.println("Thread secundária: " + i);
                // Pausa a execução desta thread por 500 milissegundos
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.err.println("A thread foi interrompida.");
        }
    }
}

public class ExemploThread {
    public static void main(String[] args) {
        // Cria uma instância da classe que contém a lógica da thread
        MeuRunnable meuRunnable = new MeuRunnable();

        // Cria um objeto Thread, passando o Runnable como "tarefa"
        Thread thread = new Thread(meuRunnable);

        // Inicia a execução da nova thread. A JVM chamará o método run()
        thread.start();

        // A thread principal (main) continua sua execução aqui
        for (int i = 0; i < 10; i++) {
            System.out.println("Thread principal: " + i);
            try {
                // Pausa a execução da thread principal por 300 milissegundos
                Thread.sleep(300);
            } catch (InterruptedException e) {
                 System.err.println("A thread principal foi interrompida.");
            }
        }
        
    }

    
}

