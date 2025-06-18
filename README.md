# TwinCode

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Visão Geral

**TwinCode** é uma ferramenta computacional desenvolvida com o objetivo de apoiar pesquisas empíricas na área de Engenharia de Software, especialmente aquelas voltadas à análise da qualidade de código. Sua principal funcionalidade consiste em possibilitar a comparação visual e estruturada entre dois trechos de código-fonte. A interface da ferramenta foi projetada para apresentar os códigos lado a lado, permitindo que os participantes da pesquisa observem e avaliem as diferenças entre eles de maneira clara e objetiva.

Nosso objetivo é disponibilizar uma interface que facilita a condução de estudos empíricos em Engenharia de Software, focados na avaliação da qualidade de código, percepção de desenvolvedores e análise de práticas como refatoração ou detecção de *code smells*.

## Principais Funcionalidades

* **Comparação Visual de Código:** Apresentação lado a lado de dois trechos de código-fonte para análise detalhada.
* **Coleta de Feedback Estruturada:** Integração de questionários personalizáveis para coletar percepções e avaliações dos participantes da pesquisa.
* **Apoio a Estudos Empíricos:** Ferramenta ideal para conduzir experimentos controlados sobre qualidade de código, usabilidade de código e refatoração.

## Tecnologias Utilizadas

O TwinCode foi desenvolvido com uma arquitetura modular, separando *front-end* e *back-end* para garantir manutenibilidade e escalabilidade:

* **Back-end:**
    * **Linguagem:** [PHP](https://www.php.net/)
    * **Framework:** [Laravel](https://laravel.com/)
* **Front-end:**
    * **Framework JS:** [ReactJS](https://react.dev/)
    * **Integração:** [InertiaJS](https://inertiajs.com)
    * **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Banco de Dados:** [MariaDB](https://mariadb.org/)
* **Ambiente de Desenvolvimento & Orquestração:**
    * [Docker](https://www.docker.com/)
    * [Laravel Sail](https://laravel.com/docs/12.x/sail)

## Instalação e Execução (Guia Rápido)

Para colocar o TwinCode em funcionamento no seu ambiente local, siga os passos abaixo:

1. **Pré-requisitos:** Certifique-se de ter o [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução.

2. **Clonar o Repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/twincode.git](https://github.com/seu-usuario/twincode.git)
    cd twincode
    ```

3. **Configurar o Ambiente com Laravel Sail:**

    ```bash
    # Copiar o arquivo de ambiente de exemplo
    cp .env.example .env

    # Instalar dependências do Composer e Node.js via Sail
    ./vendor/bin/sail up -d # Inicia os contêineres em background
    ./vendor/bin/sail composer install
    ./vendor/bin/sail npm install
    ./vendor/bin/sail npm run dev # Compila os assets do front-end
    ```

4. **Gerar Chave da Aplicação e Rodar Migrações do Banco de Dados:**

    ```bash
    ./vendor/bin/sail artisan key:generate
    ./vendor/bin/sail artisan migrate
    # Opcional: Popular o banco de dados com dados de teste/seeding
    # ./vendor/bin/sail artisan db:seed
    ```

5. **Acessar a Aplicação:**
    Após os passos anteriores, a aplicação estará disponível em `http://localhost`.

Para mais detalhes sobre a instalação clique [aqui](docs/developer-guide/instalation.md#top).

## Documentação Detalhada

Para informações mais aprofundadas sobre o TwinCode, incluindo um guia completo de uso, detalhes sobre a arquitetura, como contribuir e muito mais, consulte nosso diretório de documentação:

* [**Acessar Documentação Completa**](docs/index.md)

## Contribuição

Interessado em contribuir com o TwinCode? Veja nosso [Guia de Contribuição](CONTRIBUTING.md) para saber como.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
