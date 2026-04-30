import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class Main {

    // --- Variáveis de Estado do Jogo ---
    // Em vez de estarem no 'main', agora são membros da classe
    // para que todos os métodos possam acessá-las.
    private int vidas = 4;
    private int currentSlide = 1; // Controla qual slide/pergunta estamos exibindo

    // --- Componentes da Interface Gráfica (GUI) ---
    private Stage primaryStage;
    private ScrollPane scrollPane; // Para rolar a arte ASCII
    private Label contentLabel;   // Onde a arte ASCII e as perguntas são mostradas
    private Label feedbackLabel;  // Onde "Você errou" e as vidas restantes aparecem
    private HBox buttonBox;      // O contêiner na parte inferior para os botões

    /**
     * O método main agora serve apenas para iniciar o JavaFX.
     */
    public static void main(String[] args) {
        launch(args);
    }

    /**
     * Este é o novo "main" do seu aplicativo.
     * Ele configura a janela inicial e os componentes.
     */
    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        primaryStage.setTitle("A Lenda de Numeria");

        // 1. Configura o Label principal para a arte ASCII
        contentLabel = new Label();
        // Usamos uma fonte monoespaçada para que a arte ASCII mantenha o alinhamento
        contentLabel.setFont(Font.font("Monospaced", 12));

        // 2. Coloca o Label dentro de um ScrollPane
        scrollPane = new ScrollPane(contentLabel);
        scrollPane.setFitToWidth(true); // Faz o scrollPane usar a largura da janela
        scrollPane.setVvalue(0); // Garante que o scroll comece do topo

        // 3. Configura o Label de feedback (para vidas, etc.)
        feedbackLabel = new Label();
        feedbackLabel.setFont(Font.font("Monospaced", 14));
        feedbackLabel.setTextFill(Color.RED); // Deixa o feedback em vermelho
        feedbackLabel.setAlignment(Pos.CENTER);
        feedbackLabel.setPadding(new Insets(10));

        // 4. Configura a caixa de botões inferior
        buttonBox = new HBox(10); // 10 é o espaçamento entre os botões
        buttonBox.setAlignment(Pos.CENTER);
        buttonBox.setPadding(new Insets(10));

        // 5. Configura o Layout Principal
        BorderPane root = new BorderPane();
        root.setCenter(scrollPane);  // Arte ASCII no centro
        root.setTop(feedbackLabel);  // Feedback em cima
        root.setBottom(buttonBox);   // Botões embaixo

        // 6. Cria e exibe a Cena
        Scene scene = new Scene(root, 1024, 768); // Tamanho da janela
        primaryStage.setScene(scene);
        primaryStage.show();

        // 7. Inicia o jogo exibindo o primeiro slide
        updateScene();
    }

    /**
     * Esta é a função mais importante.
     * Ela funciona como um "controlador" que decide o que mostrar
     * na tela com base na variável 'currentSlide'.
     * Substitui a lógica linear do seu 'main' original.
     */
    private void updateScene() {
        // Limpa o feedback anterior e os botões antigos
        feedbackLabel.setText("");
        buttonBox.getChildren().clear();

        // Garante que o novo conteúdo comece do topo
        scrollPane.setVvalue(0);

        // Decide qual conteúdo e botões mostrar
        switch (currentSlide) {
            case 1:
                displayIntroSlide(SLIDE_1_CONTENT);
                break;
            case 2:
                displayIntroSlide(SLIDE_2_CONTENT);
                break;
            case 3:
                displayIntroSlide(SLIDE_3_CONTENT);
                break;
            case 4:
                displayQuestionSlide(SLIDE_4_PERGUNTA, "b");
                break;
            case 5:
                displayQuestionSlide(SLIDE_5_PERGUNTA, "b");
                break;
            case 6:
                displayQuestionSlide(SLIDE_6_PERGUNTA, "c");
                break;
            case 7:
                displayQuestionSlide(SLIDE_7_PERGUNTA, "b");
                break;
            case 8:
                displayQuestionSlide(SLIDE_8_PERGUNTA, "a");
                break;
            case 9:
                displayQuestionSlide(SLIDE_9_PERGUNTA, "c");
                break;
            case 10:
                // Caso especial para a última pergunta, para chamar a vitória
                displayQuestionSlide(SLIDE_10_PERGUNTA, "c", true);
                break;
            case 11: // Estado de Vitória
                showVictory();
                break;
            case -1: // Estado de Derrota
                showDefeat();
                break;
        }
    }

    /**
     * Helper para mostrar slides de introdução (só com botão "Continuar").
     */
    private void displayIntroSlide(String content) {
        contentLabel.setText(content);
        Button continueButton = new Button("Continuar (c)");
        // Define a ação do botão (o que acontece ao clicar)
        continueButton.setOnAction(e -> handleContinue());
        buttonBox.getChildren().add(continueButton);
    }

    /**
     * Helper para avançar os slides de introdução.
     */
    private void handleContinue() {
        currentSlide++;
        updateScene(); // Chama o controlador para mostrar o próximo slide
    }

    /**
     * Helper para mostrar slides de pergunta (com botões a, b, c, d).
     * @param content O texto da pergunta
     * @param correctAnswer A letra da resposta correta
     */
    private void displayQuestionSlide(String content, String correctAnswer) {
        displayQuestionSlide(content, correctAnswer, false);
    }

    /**
     * Sobrecarga do método para tratar a última pergunta de forma especial.
     */
    private void displayQuestionSlide(String content, String correctAnswer, boolean isLastQuestion) {
        contentLabel.setText(content);

        Button btnA = new Button("a");
        btnA.setOnAction(e -> handleAnswer("a", correctAnswer, isLastQuestion));

        Button btnB = new Button("b");
        btnB.setOnAction(e -> handleAnswer("b", correctAnswer, isLastQuestion));

        Button btnC = new Button("c");
        btnC.setOnAction(e -> handleAnswer("c", correctAnswer, isLastQuestion));

        Button btnD = new Button("d");
        btnD.setOnAction(e -> handleAnswer("d", correctAnswer, isLastQuestion));

        buttonBox.getChildren().addAll(btnA, btnB, btnC, btnD);
    }

    /**
     * Esta é a lógica que estava dentro dos seus loops 'do-while'.
     * É chamada toda vez que um botão de resposta (a, b, c, d) é clicado.
     */
    private void handleAnswer(String selectedAnswer, String correctAnswer, boolean isLastQuestion) {
        if (selectedAnswer.equals(correctAnswer)) {
            // Resposta correta
            if (isLastQuestion) {
                currentSlide = 11; // Vai para o estado de vitória
            } else {
                currentSlide++; // Avança para a próxima pergunta
            }
            updateScene(); // Atualiza a tela para a próxima pergunta ou vitória
        } else {
            // Resposta errada
            vidas--;
            // Atualiza o feedbackLabel com a arte das vidas, sem mudar o slide
            switch (vidas) {
                case 3:
                    feedbackLabel.setText(VIDAS_3);
                    break;
                case 2:
                    feedbackLabel.setText(VIDAS_2);
                    break;
                case 1:
                    feedbackLabel.setText(VIDAS_1);
                    break;
                case 0:
                    currentSlide = -1; // Vai para o estado de derrota
                    updateScene(); // Atualiza a tela para a derrota
                    break;
            }
        }
    }

    /**
     * Mostra a tela de vitória.
     */
    private void showVictory() {
        contentLabel.setText(VITORIA);
        feedbackLabel.setText("");
        buttonBox.getChildren().clear(); // Sem mais botões
    }

    /**
     * Mostra a tela de derrota.
     */
    private void showDefeat() {
        contentLabel.setText(SLIDE_DERROTA);
        feedbackLabel.setText("");
        buttonBox.getChildren().clear(); // Sem mais botões
    }


    // --- CONSTANTES DE TEXTO E ARTE ASCII ---
    // Mover todo o texto para cá limpa muito o código.
    // O "\n" inicial é para "limpar" a tela (dar espaço)
    private static final String SLIDE_1_CONTENT = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            "....................................................................................................\n" +
            "....................................................................................................\n" +
            "............................................................:.......................................\n" +
            "............................................................=.......................................\n" +
            "..............................-:...........................-*.......................................\n" +
            "..............................+*...........................=#-......................................\n" +
            ".............................-##==-.......................=+#+=.....................................\n" +
            ".............................*###*:..........:...........:###%#:....................................\n" +
            "............................+#####:..........+...........-#####:....................................\n" +
            "...........................+####%#=........:-*+.........-:**###:......:.............................\n" +
            "..........................:+**####+........**##+:.....:-+-**##*:......=.............................\n" +
            "...........................+######=........**#%#*++*####%***##*:.....-#+............................\n" +
            "...........................=**###*+=.......=*#%########%%%#####+:...:*##+...........................\n" +
            "...........................=***#####:::...:**##########%%%%%%%#%=..:#%#%%+-:........................\n" +
            "...........................=++*#####+-*+..+#****#%%%###%%%%%%%%%#-:**##%%%%%#:......................\n" +
            "...........................-=++*##*##***+-******%@@%%%%%%%%%%%%%%-.*#%%%%%%%#:......................\n" +
            "...........................===+*##*##*****##***%%%%%%%%%%%%%%%%%##=:####%%%%=.......=*##:...........\n" +
            "....................:-=-=::=+=+*##*##***++*%##%%%@@@@@@@%%%%%%%%%%%%####%%%%+.....-+*##%%#:.........\n" +
            "...........:***+==:=#%%#*++++=+*##***#####%%%##*%%%%@@@%%%%%%%%%%%%%%##%%%%%#+=...-**#%%%#..........\n" +
            "...........:#%##**.:#%%%#*****++***####+**#%###*#%%%%@@@%%%%%%%%%%%%%%%%%%%%%####-.=*##%%=..........\n" +
            "............+##**=-+#%%%#++*%######%##%######%#*#%%%%@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%###%%####.......\n" +
            "...........:*%##%%%%%%%##**#%##%%####%@%%#%%%%%*%%%%%@@@@%%%%%%%%%%%@@@%%%%@%%%%%%%%%%%%%%##*.......\n" +
            "...........:#%%%%%%%%%%##*#%%#%%%%@%##%%%####%##%%%%%@@@@@%%%%%%%%%%@@@%%%%%%%%%%%%%%%%%%%%%#.......\n" +
            "...........-%%%%%%%%%%%%###%%%%%%@@%#%%%%%##%%%#%%%%%@@@@@@%%%%%%%%%@@@%%%%%%%%%%%%%@%%%%%%%%.......\n" +
            "...........*%%%%%%%%%%%%###%%%%%%@%%#%@@%%%%%%##%%%%@@@@@@@@%%%%%%@@@@@@%%%%%%%%%%%%@%%%%%%%%=......\n" +
            "..........:%%%%%%%%%%%%%%%%%%%%%%@@##%@@%%%%%%##%%@@@@@@@@@@@@@@@@@@@@@@%%%@%%%%%%%%@@%%%%%%%+......\n" +
            "........:-*%%%%%%%%%%%%%%%%%%%%%%@%##%@@%%%%%%%%%%@@@@@@@@@@%%@@@@@@@@@@@@%@@%@@%%%%%@%%%%%##*-:....\n" +
            "......:==+**###%%%%%%%%%%%%%%%%%%@%%%@@@@%%%%%%%@@@@@@%%@@@@@@%%@@@@@@@@@@@@%%%@%%%%%%%#*+=----::...\n" +
            "................:-=++******##%##%%%%%%%%%%#%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%###**+-:...............\n" +
            "..............................:..:-+++=++==++*+++=--==++++==---:::::................................\n" +
            "....................................................................................................\n" +
            " ____________________________________________________________________________________________\n" +
            "|                                                                                            |\n" +
            "| No distante Reino de Numeria, onde a magia se entrelaçava com a sabedoria dos números,     |\n" +
            "| quatro heróis se reuniram para salvar o reino de uma ameaça iminente.                      |\n" +
            "|____________________________________________________________________________________________|\n";

    private static final String SLIDE_2_CONTENT = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            "---------------------------------------------------------------------------------------------------------------------------\n" +
            "---------------------------------------------------------------------------------------------------------------------------\n" +
            "-----------------------------------------------------------------------------=---+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*+=-\n" +
            "---------------------------------------------------------------------------=%%##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%@@@@@@@@@@\n" +
            "=+**#*++++========---------------------------------------------------------*=+#@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%##\n" +
            "--=#@@@@@@@@@@@@@@%*=---------------------------------------------------------=%@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%#%%%%#+----\n" +
            "----=#%%%%@@@@@@@@@@@@%#+--=*+------------------------------------------------+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%*------\n" +
            "----*%%%%%%%%@@@@@@@@@@@@@@%%%%=---------------------------------------------=#@@@@@@@@@@@@@@@@@%%%%%%%%%@@@@@@@%%%*=------\n" +
            "--=%%%@@@@@@@@@@@@@@@@@@@@@@@@@#=--------------------------------------------+%@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%@@@@%%+------\n" +
            "#%@@@@@@@%%%%%%%%%%@@@@@@@@@@@@@%*------------------------------------------=%%@@@@@@@%%%%@@@@@@%%%%%%%%%%%%%%%%%@@@#=-----\n" +
            "*#%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@#=---------------------------------------=%%@@@@@@@%%%%%%%@@@@%%%%%%%%#*##*+==+++*##+=---\n" +
            "----=+%%%%%%%%%@@@@%%%%%@@@@@@@@@@@%*=------------------------------------+%%%@@@@@@%%%%%%%%%%%@@%%%%%%%#=------------=++--\n" +
            "------=#%%%%%@@%%%%%%%%%@@%%%%%@%%@@@%*=---------------------------------*%%%@@@@@@%%%%%%%%%%%%%@@%%%%%*-------------------\n" +
            "------=*%%%%%%%%%%%%%%%@@%%%%%%%%%%%@@@%*=-----------------------------+%%%%@@@@@@%%%%%%%%%%%%%%%%@%%##--------------------\n" +
            "------=%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%@@%%#+-------------------------+#%%%@@@@@@@%%%%%%%%%######%%%%%%+--------------------\n" +
            "-----+*+=------+*##%%%%%%%%%%##%%%%%%%%%@@%%%*=----------==--------=#%%%%@@@@@@%%%%#%######*#**####%%%=--------------------\n" +
            "----+-------------+#%%%%%######%%%%%%%%%%%%%%%%%*=---=+++%##**+=+*#%%%@@@@@@@%%%%%%%%%####*==------=+#+--------------------\n" +
            "-------------------*%%*=---=+*##%%%###%%%%%%%%%%%####%%%##%%%%%%%%@@@@@@@@@@%%%%%%%%%#+=--------------++-------------------\n" +
            "-------------------+*=--------=#%%%#######%%%%%%%%%@@%%%%@@@@@@@@@@@@@@@@@%%%%%%%%%#+------------------=-------------------\n" +
            "------------------=+-----------=#%#+=---=+#*##%%%%@%%%%@@@@@@%@@@@@@@@@@@%%%%%%#**=----------------------------------------\n" +
            "------------------=-------------=*=---------=*#%%@%%%@@@@@@@@%%%@@@@@@@@@%%%#%#+=------------------------------------------\n" +
            "--------------------------------=+----------+=*%@%%@@@@@@@@@@@@@@@@@@@@@@%%%%#+-------------------------------=------------\n" +
            "------------------------------------------=*=*%%%%@%@@%%%%%%%%%@@@@@@@@@@@%%%=-----------------------------===-------------\n" +
            "------------------------------------------*##%%@@@@@%%%%###%%%%%%@@@@@@@@@%%=-----------=+**+=-----------=======-----------\n" +
            "-----------------------------------------+#%%%%%@@%#=*%######%%%%%%%@@@@@@%*----------=++---=**=--------========-----------\n" +
            "-----------------==----------------------*%%%%%%%%*=--*%%####%%%%%%@@@@@@@%#=---------==------+#=------===++++====---------\n" +
            "----------------====--------------------*%%%*+##%%+--=#%%#=--=+%%@%%%%@@@@%%*=-----------------##-----==+++++++==----------\n" +
            "---------------=============------------*#*+=-+##----*%%#*=+#%%@%%%%%%%%%@%%%*=----------------*#--=--=++++++++==----------\n" +
            "----------------=======++====--------------===*#---=#%#+=++#%%%%%%%%%%%%%@%%%%*---------------=##=--===+++++++=====--------\n" +
            "---------------=====++++++===--------------===**--=#%#*---+***#%%%%%%%%%%@%%%%%#=------------=##+--===++++*+++=====--------\n" +
            "--------------======++++++++==------------==---=--*#*-=+---==+%%%%%#=-+%%%@%%%%%#*=--------=*##+==+++++****++++==----------\n" +
            "---------------===+++++++++=====----------====----+#*--------*%%%%%+==-*%%@%%%%%%%%#**+++*####+==+++*******+++====---------\n" +
            "---------------==++++++++++++===---------=====-----==--------*%%%%%%%#=-=#*%%*+###%%%%%%%##*+====++********+++=====--------\n" +
            "--------------===+++*******+++==-------=======-----------=+---=====#%*----+%%+---==+++++==-=++++++*********++++=====-------\n" +
            "--------------===++++********++==-----===+==+==----------+*-------=#%=----*%%=-----------==++****#*********+++====---------\n" +
            "---------------==+++***********+==---===++=++==--------==##+----=+#%#=-+=*%%%=---------====+***************++====----------\n" +
            "---------------===++*****####***++=====+*++++=--------=**#%#+=-+#%%***+##*%#%-------====+=+***************+====------------\n" +
            "----------------==+++***#*#####***+++++**++**+=-------=###%%#*+*##%%%%%%+#++#==---====+*#*+**************++==--------------\n" +
            "-----------------==+++**#*#######**++***+++**+==-------+##%%%%%%%%%%%%%%%%+++#+=+====+*#%#*++++++***##**+===---------------\n" +
            "-------------------==++**#######*#****++==+**++===----=*##%%%%#%%%%%%%%%%%%%%%##*===+*#%##*+==+*****##*+==-----------------\n" +
            "------------------====+***#***********+=-==+**++=*=---+#######%%%###%%%%%%%%%###*+++*##%##%%*#******#*+====----------------\n" +
            "---------------------==+**##*********+==-=++**++*##=-=*##****#@@%%%%%%%%%***###******###%%%%%%%%**#**+++++==---------------\n" +
            "---------------------=-==+*#*****+=+++==-=++****####++###*###%@@@%%%%%%%%%%%%###**++*%%%%@@@@@@%****++***+==---------------\n" +
            "------------------------==+******+====--===+**********###*##%@@@@@%%%%%%%%##%%###**++###%%%%@@%*****+****####=-------------\n" +
            "-------------------------==+****+=====--=+**+*********####%%@@@@@@@@@@@%%%%%%##**########%%%@@%****++***###%%#*=-----------\n" +
            "------------------=====--=+#%#%*#*+*++=-=====+*******##%%#%%%%@@@@@@@@%%%%%%%%%%%%%%%%%#%%%@@@%**++=+****##%%%%+-----------\n" +
            "-----------------*%%%#***=+%%%%%##****+-======+***##*########%%@@@@@@%%%%%%%%%%%%%%%%%%%%%%@@@%#**+++=+**#%%%@#=-----------\n" +
            "-----------------+#%%#***++#%%%%#******++****#*****#####%%%##%%%@@@@@@@@@@@@@@@@@%@%%@@@%%%@@@@###*#*++***#%%%#+++=--------\n" +
            "-----------------=#%%#*****#%%%%#****#%%%####%%##%%#####%%%##%%@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@%%%%%%%%%###%%@%##%#=-------\n" +
            "-----------------+#%%#%%%%%%@%%%##*##%##%####%%%%@@@%%%%%%%%#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%@%%#%#=-------\n" +
            "-----------------+%%%%%%%%%%@%%%####%%%%%%%%%%##%@@%%##%%%%%#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@%@@@@%%%%%%%%#=-------\n" +
            "-----------------*%%%%%%%%%%@%%%%###%%%%%%%@@@%#%@@@%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@%%%%@%%%%=-------\n" +
            "-----------------#%%%%@%%%%%@%%%%##%%%%%%%@@@@%%%@@@%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%@@%%%%%%%%%+-------\n" +
            "----------------+#%%%%%%%%%@@%%%%%%%%%%%%%@@@%%%%@@@%%%%%%%#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%*-------\n" +
            "----------------*%%%%%%%%@@@@%%%%%%%%%%%%%@@%%%%@@@@@%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%##*=------\n" +
            "--------------=+*#####%%@@@@%%%%%%%%%%%%%%%%###%@@@%@@%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%##%%%%%%####**+==------\n" +
            "---------------===++++*##%%%%%%%%##%%%%%%%%%##%%@%%%%%%%%%%%%@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@%%%%%%***##*****++==---------\n" +
            "---------------------===+++**#**############*#%%%#**%%%%%%%%%%%%%##%%%%%%%%%%%%%%%%%%%%###########**+++++======------------\n" +
            "-----------------------------===++++++++++===+********######****+++****##*****+***+++++++====+======-----------------------\n" +
            "---------------------------------------------------=========---------------------------------------------------------------\n" +
            " _______________________________________________________________________________________________\n" +
            "|                                                                                               |\n" +
            "|O reino enfrentava um terrível dragão chamado Hipotenucos, que devastava as aldeias de forma   |\n" +
            "|imprevisível, lançando tempestades de fogo em locais aparentemente aleatórios. O rei           |\n" +
            "|convocou os quatro heróis para usar suas habilidades matemáticas para prever os próximos       |\n" +
            "|ataques e derrotar a criatura.                                                                 |\n" +
            "|_______________________________________________________________________________________________|\n";

    private static final String SLIDE_3_CONTENT = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " ___________________________________________________________________________________________\n" +
            "|                                                                                           |\n" +
            "|Sir Algébrio começou a coletar dados das áreas afetadas, criando equações que descreviam   |\n" +
            "|os padrões de movimento do dragão. Lady Probabilina usou a teoria da probabilidade para    |\n" +
            "|estimar onde seriam as próximas investidas, calculando as chances de ataque em diferentes  |\n" +
            "|regiões.                                                                                   |\n" +
            "|___________________________________________________________________________________________|\n";

    private static final String SLIDE_4_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " __________________________________________________________________________________________\n" +
            "|                                                                                          |\n" +
            "|Com base nos dados coletados por Sir Algébrico e com a ajuda de Lady Probabilina,         |\n" +
            "|foi estimado que a probabilidade do dragão atacar o portão sul é de 30% e a probabilidade |\n" +
            "|de atacar o portão norte é de 60%. Supondo independência, qual a chance do dragão atacar  |\n" +
            "|os dois portões?                                                                          |\n" +
            "|                                                                                          |\n" +
            "|a) 16%        b) 18%      c) 20%      d) 10%                                              |\n" +
            "|__________________________________________________________________________________________|\n";

    private static final String SLIDE_5_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " __________________________________________________________________________________________\n" +
            "|                                                                                          |\n" +
            "|Lady Probabilina lançou suas cartas da sorte e descobriu que as chances de o dragão atacar|\n" +
            "|à noite são de 60% , e a chance de chover durante um ataque é de 20%. Supondo que os      |\n" +
            "|eventos sejam independentes, qual a probabilidade de o dragão atacar à noite e com chuva? |\n" +
            "|                                                                                          |\n" +
            "| a) 8%      b) 12%        c)3%        d)4%                                                |\n" +
            "|__________________________________________________________________________________________|\n";

    private static final String SLIDE_6_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " __________________________________________________________________________________________\n" +
            "|                                                                                          |\n" +
            "|Duke Estatíston mediu a altura das chamas do dragão. A média foi de 12 metros, com desvio |\n" +
            "|padrão de 2 m. Com base nisso a altura das chamas estará entre:                           |\n" +
            "|                                                                                          |\n" +
            "|a) 10 e 14m        b) 8 e 16m      c) 6 e 18m      d) 4 e 20m                             |\n" +
            "|__________________________________________________________________________________________|\n";

    private static final String SLIDE_7_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " __________________________________________________________________________________________________\n" +
            "|                                                                                                  |\n" +
            "|Durante um dos ataques do dragão Sir Algébrio observou que o desvio padrão das distâncias         |\n" +
            "|de voo do dragão é muito alto, o que isso indica?                                                 |\n" +
            "|                                                                                                  |\n" +
            "|a) Que o dragão voa sempre a mesma distância       b) Que o dragão muda bastante suas rotas       |\n" +
            "|c) Que a média das distâncias é muito pequena      d) Que os dados foram coletados incorretamente |\n" +
            "|__________________________________________________________________________________________________|\n";

    private static final String SLIDE_8_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n " +
            " ____________________________________________________________________________________________________________|\n" +
            "|                                                                                                            |\n" +
            "|Lady Probabilina percebeu que, quanto mais forte o vento, menor é a precisão dos ataques de fogo do dragão. |\n" +
            "|O tipo de correlação entre essas variáveis é:                                                               |\n" +
            "|                                                                                                            |\n" +
            "| a) Negativa      b)Positiva      c) Nula     d) Perfeita positiva                                          |\n" +
            "|____________________________________________________________________________________________________________|\n";

    private static final String SLIDE_9_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " ________________________________________________________________________________\n" +
            "|                                                                                 |\n" +
            "|Duke Estatíston calculou o coeficiente de correlação entre a distância do dragão |\n" +
            "|e o tempo até o ataque: r=0,85                                                   |\n" +
            "|                                                                                 |\n" +
            "| a) A relação é fraca e negativa       b) As variáveis são independentes         |\n" +
            "| c) A relação é forte e positiva       d) A correlação é inexistente             |\n" +
            "|_________________________________________________________________________________|\n";

    private static final String SLIDE_10_PERGUNTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            " _____________________________________________________________________________________________________\n" +
            "|                                                                                                     |\n" +
            "|Sir Trigonometrix precisa estimar a altura média das chamas do dragão sem observar todos os ataques. |\n" +
            "|Ele escolhe aleatoriamente 10 batalhas de um total de 100. Esse tipo de amostragem é:                |\n" +
            "|                                                                                                     |\n" +
            "| a) Amostragem sistemática     b) Amostragem estratificada     c) Amostragem aleatória simples       |\n" +
            "| d) Amostragem por conveniência                                                                      |\n" +
            "|_____________________________________________________________________________________________________|\n";

    private static final String SLIDE_DERROTA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n" +
            "████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n" +
            "████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n" +
            "                                                                                                                                    \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        ░░        ░░   ░░░  ░░        ░░        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    \n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒    ▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    \n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓T▓▓▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓  ▓  ▓  ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    \n" +
            "██████████████████████████████████  █████  ████████  ██    █████  █████  ███████████████████████████████████████████████████████    \n" +
            "██████████████████████████████████  █████        ██  ███   █████  █████        █████████████████████████████████████████████████    \n" +
            "                                                                                                                                    \n" +
            "░░░░░░░░░░░░░   ░░░  ░░░      ░░░  ░░░░  ░░░      ░░░  ░░░░  ░░        ░░   ░░░  ░░        ░░        ░░░░░░░░░░░░░░░░░░░░░░░░░      \n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒    ▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒   ▒▒   ▒▒  ▒▒▒▒▒▒▒▒    ▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒      \n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓  ▓  ▓▓  ▓▓▓▓  ▓▓▓  ▓▓  ▓▓▓  ▓▓▓▓  ▓▓        ▓▓      ▓▓▓▓  ▓  ▓  ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓▓▓T▓▓▓▓▓▓▓▓▓▓▓▓▓      \n" +
            "█████████████  ██    ██  ████  ████    ████        ██  █  █  ██  ████████  ██    █████  █████  ███████████████████████████████      \n" +
            "█████████████  ███   ███      ██████  █████  ████  ██  ████  ██        ██  ███   █████  █████        █████████████████████████      \n" +
            "                                                                                                                                    \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░            \n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒            \n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            \n" +
            "████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████            \n" +
            "██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████            ";

    private static final String VIDAS_3 = "" +
            "      Você errou.                                           \n" +
            "      Vidas Restantes:                                      \n" +
            "                                                            \n" +
            "      ###  ###      ###  ###       ###  ###                 \n" +
            "     ##########    ##########     ##########                \n" +
            "     ##########    ##########     ##########                \n" +
            "     ##########    ##########     ##########                \n" +
            "       ######        ######         ######                  \n" +
            "         ##            ##             ##                    \n";

    private static final String VIDAS_2 = "" +
            "      Você errou.                                           \n" +
            "      Vidas Restantes:                                      \n" +
            "                                                            \n" +
            "      ###  ###      ###  ###                                \n" +
            "     ##########    ##########                               \n" +
            "     ##########    ##########                               \n" +
            "     ##########    ##########                               \n" +
            "       ######        ######                                 \n" +
            "         ##            ##                                   \n";

    private static final String VIDAS_1 = "" +
            "      Você errou.                                           \n" +
            "      Vidas Restantes:                                      \n" +
            "                                                            \n" +
            "      ###  ###                                              \n" +
            "     ##########                                             \n" +
            "     ##########                                             \n" +
            "     ##########                                             \n" +
            "       ######                                               \n" +
            "         ##                                                 \n";

    private static final String VITORIA = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
            "         @**@                              =              .:::     -:                     .         .                                     \n" +
            "        @*==*@                 ::=+=      :-=           -##*+++++. .:-                   ::         :.   :. ..   :-.                      \n" +
            "@@@    @#*+=+#@              -:::-++==    :-=         .#%#**++*#%%#-  :-                .:...:==-:...:  ===++=------                      \n" +
            "%-* @#*+++++++#@            :-==-===-    :-          -==##**#*++++#:  --               .-:-++=+++==:-  ===+=====:-=.                     \n" +
            "@*# @@%#++++++#%@@           :--===---    :=          .+=###++*+=**%:  .--               .:=***+++++:  .==+*++==----                      \n" +
            " +* @=+=*++*==-@           -=-**++*==-   :=         .*%%#**+===+=+%=  --.                :+*+++=+=*=   . .*=:==--=.                      \n" +
            " @*#%%*.-*+**:.*%%#@       :::-++***+==-  :=           -##%%#+===+#=   .---:              :+++++++==+.    -+- :=--.                       \n" +
            " @*=+==*+:..-+*==*=%      =+==-:-=++===+===++          ++##*++###**=-====::            .+###**+*+#++++*: -*=. :-:.                        \n" +
            " @*@@@@+==*+===@@@        *+-.......-+=*++-             :=#%###*##*=+#++=             :###**#*++++++*+*+====-                             \n" +
            " @*@  %+=======%          -=*==-=-==+++***+               .#%***#%#.   :=.            :+=+##**##++***#*##*==:                             \n" +
            " @%@ @#+=======#         ++*--=+=-=--   *** .#%####%%*.  --             -===+#%###**##%#+*%#=:                              \n" +
            "                        *+***---=..----                  -###%#**#%#*.--              .+#*##%%###*+##*+--=*=                              \n" +
            "                      ***#  .:-=-.:+-:.                 .++*##%%##=.+=.                -+==+####*##*##* .*=.                              \n" +
            "                    =+** ++++ ++++                  .+##=   +*+*:                 :=-==*##%######*=.*=                                \n" +
            "                             **** **** .*%+    *%#.                  :--*%##########.++:                                \n" +
            "                            ####* *####                 :###= . .:+%#.                     -%##*:.*%##: *+                                \n" +
            "                                                                                         :+#**:  =#**=-+-                                 \n" +
            "                                                                                       .=#**#*-  =####**=                                 \n" +
            "                                                                                         .::.       ..:.                                  \n" +
            "                                                                                                                                          \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n" +
    Map<String, String> appParameters = new HashMap<>();
            "██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n" +
            "                                                                                                                                          \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░  ░░        ░░        ░░░      ░░░       ░░░        ░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  \n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  \n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓  ▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓▓  ▓▓       ▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  \n" +
            "█████████████████████████████████    ███████  ████████  █████  ████  ██  ███  ██████  █████        █████████████████████████████████████  \n" +
            "██████████████████████████████████  █████        █████  ██████      ███  ████  ██        ██  ████  █████████████████████████████████████  \n" +
            "                                                                                                                                          \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n" +
            "██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n" +
            "██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n" +
            "                                                                                                                                          ";
}