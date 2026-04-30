public class Conta {
    
    private int numero;
    private int agencia;
    private double saldo;

        public Conta(int numero, int agencia){
            this.numero = numero;
            this.agencia = agencia;
            this.saldo = 0.0;
        }

        public double getSaldo(){
            return this.saldo; 
        }
}
