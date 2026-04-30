# 📦 Atividade de Fixação — JDBC com MySQL

> Atividade de fixação pessoal para praticar conectividade com banco de dados usando **Java JDBC** e **MySQL**, aplicando o padrão de arquitetura em camadas (Model → Repository → Service).

---

## 🎯 Objetivo

Consolidar os conhecimentos de:

- Conexão com banco de dados MySQL via **JDBC** (Java Database Connectivity)
- Organização do projeto em camadas: **Model**, **Repository** e **Service**
- Uso de `PreparedStatement` para execução de comandos SQL parametrizados
- Mapeamento de entidades Java para tabelas do banco de dados

---

## 🗂️ Estrutura do Projeto

```
atividade_treinamento_jdbc/
│
├── database/
│   └── Conexao.java             # Classe responsável pela conexão com o MySQL
│
├── model/
│   ├── Equipamento.java         # Entidade Equipamento (id, nome, tipo, numero_serie, trabalhador_id)
│   └── Trabalhador.java         # Entidade Trabalhador (id, nome, cpf, cnpj)
│
├── repository/
│   ├── EquipamentoRepositoryImpl.java   # CRUD de Equipamento no banco de dados
│   └── TrabalhadorRepositoryImpl.java   # CRUD de Trabalhador no banco de dados (em desenvolvimento)
│
├── service/
│   ├── EquipamentoService.java          # Regras de negócio de Equipamento (em desenvolvimento)
│   └── TrabalhadorService.java          # Regras de negócio de Trabalhador (em desenvolvimento)
│
└── README.md
```

---

## 🏗️ Arquitetura em Camadas

O projeto segue o padrão de separação de responsabilidades:

```
[ Service ] → [ Repository ] → [ Database ]
     ↕               ↕
  [ Model ]      [ Model ]
```

| Camada       | Responsabilidade                                              |
|--------------|---------------------------------------------------------------|
| `model`      | Representação das entidades (POJOs com getters e setters)     |
| `repository` | Comunicação direta com o banco de dados via JDBC              |
| `service`    | Regras de negócio e orquestração das chamadas ao repositório  |
| `database`   | Centraliza a lógica de conexão com o MySQL                    |

---

## 🗃️ Entidades

### `Trabalhador`

| Campo  | Tipo     | Descrição                     |
|--------|----------|-------------------------------|
| `id`   | `int`    | Identificador único           |
| `nome` | `String` | Nome completo do trabalhador  |
| `cpf`  | `String` | CPF do trabalhador            |
| `cnpj` | `String` | CNPJ vinculado ao trabalhador |

### `Equipamento`

| Campo            | Tipo     | Descrição                                    |
|------------------|----------|----------------------------------------------|
| `id`             | `int`    | Identificador único                          |
| `nome`           | `String` | Nome do equipamento                          |
| `tipo`           | `String` | Tipo/categoria do equipamento                |
| `numero_serie`   | `String` | Número de série do equipamento               |
| `trabalhador_id` | `int`    | Chave estrangeira — trabalhador responsável  |

---

## 🔌 Configuração do Banco de Dados

A conexão é gerenciada pela classe `database.Conexao`:

```java
// database/Conexao.java
private static final String URL = "jdbc:mysql://localhost:3356/atividade_reforco?useSSL=false&serverTimezone=UTC";
private static final String USER = "root";
private static final String PASSWORD = "mysqlPW";
```

> ⚠️ **Atenção:** Certifique-se de que o MySQL está rodando na porta **3356** e que o banco de dados `atividade_reforco` foi criado antes de executar o projeto.

### Script SQL sugerido para criação das tabelas

```sql
CREATE DATABASE IF NOT EXISTS atividade_reforco;
USE atividade_reforco;

CREATE TABLE IF NOT EXISTS Trabalhador (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    cpf   VARCHAR(14)  NOT NULL,
    cnpj  VARCHAR(18)
);

CREATE TABLE IF NOT EXISTS Equipamento (
    id             INT PRIMARY KEY AUTO_INCREMENT,
    nome           VARCHAR(100) NOT NULL,
    tipo           VARCHAR(50),
    numero_serie   VARCHAR(50)  NOT NULL,
    trabalhador_id INT,
    FOREIGN KEY (trabalhador_id) REFERENCES Trabalhador(id)
);
```

---

## ▶️ Como Executar

### Pré-requisitos

- **Java 17+** instalado
- **MySQL** rodando localmente na porta `3356`
- Banco de dados `atividade_reforco` criado com as tabelas acima
- Driver **MySQL Connector/J** adicionado ao classpath do projeto

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustaaxz/atvd_fixacao_jdbc.git
   cd atvd_fixacao_jdbc
   ```

2. Adicione o driver JDBC do MySQL ao projeto (via IntelliJ: `File > Project Structure > Libraries > +`).

3. Ajuste as credenciais em `database/Conexao.java` caso necessário.

4. Execute a classe principal (ou crie um `Main.java` para testar os repositórios).

---

## ✅ Checklist de Implementos

### 👷 TrabalhadorRepositoryImpl

- [x] `buscarTrabalhadorPorId(int id)` → `SELECT` por ID, retorna `Trabalhador`
- [x] `listarTodosTrabalhadores()` → `SELECT *`, retorna `List<Trabalhador>`
- [x] `atualizarTrabalhador(Trabalhador trabalhador)` → `UPDATE` nome, cpf, cnpj por ID
- [x] `deletarTrabalhador(int id)` → `DELETE` por ID
- [x] `buscarTrabalhadorPorCpf(String cpf)` → `SELECT` por CPF, retorna `Trabalhador`
- [x] `verificarSeTrabalhadorExiste(int id)` → `SELECT` por ID, retorna `boolean`

### 🔧 EquipamentoRepositoryImpl

- [x] `buscarEquipamentoPorId(int id)` → `SELECT` por ID, retorna `Equipamento`
- [x] `listarTodosEquipamentos()` → `SELECT *`, retorna `List<Equipamento>`
- [x] `atualizarEquipamento(Equipamento equipamento)` → `UPDATE` nome, tipo, numero_serie por ID
- [x] `deletarEquipamento(int id)` → `DELETE` por ID
- [x] `listarEquipamentosPorTrabalhador(int trabalhador_id)` → `SELECT` por FK, retorna `List<Equipamento>`
- [x] `buscarEquipamentoPorNumeroSerie(String numeroSerie)` → `SELECT` por numero_serie, retorna `Equipamento`

> **12/12 concluídos** 🏁

---

## 📌 Status do Projeto

| Componente                    | Status           |
|-------------------------------|------------------|
| `Conexao.java`                | ✅ Concluído      |
| `Trabalhador.java` (model)    | ✅ Concluído      |
| `Equipamento.java` (model)    | ✅ Concluído      |
| `EquipamentoRepositoryImpl`   | 🔧 Em andamento  |
| `TrabalhadorRepositoryImpl`   | 🔧 Em andamento  |
| `EquipamentoService`          | 🔧 Em andamento  |
| `TrabalhadorService`          | 🔧 Em andamento  |

---

## 📚 Tecnologias Utilizadas

- **Java** — Linguagem principal
- **JDBC** — API de conectividade com banco de dados
- **MySQL** — Sistema gerenciador de banco de dados relacional
- **IntelliJ IDEA** — IDE utilizada no desenvolvimento

---

*Atividade de fixação pessoal — JDBC & MySQL*