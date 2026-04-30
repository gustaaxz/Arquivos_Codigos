module com.example.testemysql {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.testemysql to javafx.fxml;
    exports com.example.testemysql;
}