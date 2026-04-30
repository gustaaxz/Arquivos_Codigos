module com.example.teste {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.teste to javafx.fxml;
    exports com.example.teste;
}