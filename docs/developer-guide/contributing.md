# Guia de Contribuição para o TwinCode

Agradecemos o seu interesse em contribuir com o TwinCode! Sua colaboração é fundamental para aprimorar esta ferramenta e expandir seu impacto nas pesquisas em Engenharia de Software. Este guia detalha o processo para configurar seu ambiente de desenvolvimento, seguir as convenções de código e submeter suas contribuições.

## Código de Conduta

Ao contribuir com o TwinCode, esperamos que você siga nosso [Código de Conduta](code_of_conduct.md). Em resumo, seja respeitoso, inclusivo e prestativo com todos os membros da comunidade.

## Como Contribuir

Existem diversas maneiras de contribuir para o TwinCode:

* **Relatando Bugs:** Ajude-nos a identificar e corrigir problemas.
* **Sugerindo Funcionalidades:** Compartilhe ideias para aprimorar a ferramenta.
* **Escrevendo Código:** Implemente novas funcionalidades, corrija bugs ou otimize o código existente.
* **Melhorando a Documentação:** Garanta que a documentação esteja clara, completa e atualizada.

## Configuração do Ambiente de Desenvolvimento

O TwinCode utiliza **Docker** e **Laravel Sail** para orquestrar seu ambiente de desenvolvimento, garantindo consistência e facilidade de configuração em diferentes sistemas operacionais.

### Pré-requisitos

Certifique-se de ter o [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução em sua máquina.

### Passos para Configuração

1.  **Fork e Clone do Repositório:**
    Primeiro, faça um *fork* do repositório oficial do TwinCode para sua conta GitHub. Em seguida, clone seu *fork* para sua máquina local:

    ```bash
    git clone [https://github.com/alanfm/twincode.git](https://github.com/alanfm/twincode.git)
    cd twincode
    ```

2.  **Configuração Inicial do Projeto:**
    Copie o arquivo de variáveis de ambiente de exemplo e inicie os serviços do Docker via Sail:

    ```bash
    cp .env.example .env
    ./vendor/bin/sail up -d # Inicia os contêineres em background
    ```

3.  **Instalação de Dependências:**
    Instale as dependências do Composer (PHP) e do Node.js (JavaScript) dentro dos contêineres:

    ```bash
    ./vendor/bin/sail composer install
    ./vendor/bin/sail npm install
    ```

4.  **Configuração da Aplicação:**
    Gere a chave da aplicação e execute as migrações do banco de dados. O Laravel Sail se encarregará de conectar ao MariaDB dentro do Docker.

    ```bash
    ./vendor/bin/sail artisan key:generate
    ./vendor/bin/sail artisan migrate
    # Opcional: Se houver seeders para dados de teste, execute-os:
    # ./vendor/bin/sail artisan db:seed
    ```

5.  **Compilação dos Assets do Front-end:**
    Para que as alterações no ReactJS e Tailwind CSS sejam visíveis, compile os *assets*:

    ```bash
    ./vendor/bin/sail npm run dev # Para desenvolvimento (compilação rápida e hot-reloading)
    # ou
    # ./vendor/bin/sail npm run build # Para produção (compilação otimizada)
    ```

6.  **Acesso à Aplicação:**
    A aplicação estará acessível em `http://localhost` no seu navegador.

## Padrões de Código e Boas Práticas

Para manter a consistência e a qualidade do código no TwinCode, solicitamos que os colaboradores sigam as seguintes diretrizes:

### Padrões PHP (Back-end com Laravel)

* **PSR-12 (Extended Coding Style):** Siga as recomendações de estilo de código da PHP-FIG para PHP. O Laravel já adere amplamente a essas diretrizes.
    * [Referência: PSR-12 - Extended Coding Style](https://www.php-fig.org/psr/psr-12/)
* **Conveções do Laravel:** Adira às convenções do Laravel para nomes de arquivos, classes (Model, Controller, Service, etc.), rotas e *migrations*.
    * **Nomes de Classes:** CamelCase (`UserController`, `ProductService`).
    * **Nomes de Métodos:** camelCase (`getUserById`, `saveProduct`).
    * **Variáveis:** camelCase (`userName`, `productPrice`).
    * **Nomes de Tabelas:** Plural (ex: `users`, `products`).
    * **Nomes de Migrações:** Descritivos e no formato `YYYY_MM_DD_HHMMSS_create_table_name_table`.
    * **Comentários:** Use PHPDoc para classes, métodos e propriedades.
* **Princípios SOLID:** Esforce-se para aplicar os princípios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) sempre que possível para garantir código modular e fácil de manter.
    * [Referência: SOLID Principles in PHP](https://medium.com/@dev_hassan/solid-principles-in-php-c39775080c98)
* **Validação de Dados:** Utilize as capacidades de validação do Laravel para todos os dados de entrada.
* **Segurança:** Esteja atento a vulnerabilidades de segurança (XSS, CSRF, SQL Injection). O Laravel já oferece proteções nativas, mas é importante usá-las corretamente.

### Padrões JavaScript (Front-end com ReactJS e InertiaJS)

* **ESLint e Prettier:** Utilize ferramentas como ESLint (para linting de código) e Prettier (para formatação automática) para manter a consistência do código JavaScript/React. O projeto deve ter configurações pré-definidas para isso.
    * `./vendor/bin/sail npm run lint` (se configurado)
    * `./vendor/bin/sail npm run format` (se configurado)
* **Conveções do React:**
    * **Nomes de Componentes:** PascalCase (`<MyComponent />`, `<HomePage />`).
    * **Nomes de Hooks Customizados:** Começam com `use` (`useFetchData`, `useLocalStorage`).
    * **Organização de Componentes:** Mantenha os componentes pequenos e com uma única responsabilidade. Considere agrupar componentes por funcionalidade ou tipo (`components/auth/Login.jsx`, `pages/experiments/CreateExperiment.jsx`).
* **InertiaJS:**
    * Utilize as funções `Inertia.get`, `Inertia.post`, `Inertia.put`, `Inertia.delete` para navegação e submissão de formulários, evitando reloads de página.
    * Gerencie o estado global (se necessário) de forma eficiente, talvez com Context API ou Redux/Zustand para estados mais complexos.
* **Tailwind CSS:**
    * Priorize classes utilitárias diretamente no HTML/JSX. Evite a criação de CSS customizado excessivo.
    * Siga as convenções de nomeação e uso do Tailwind.

### Comentários e Documentação Inline

* **Back-end:** Comente classes, métodos complexos, lógica de negócio crítica e qualquer parte do código que não seja autoexplicativa. Use PHPDoc para documentar métodos (parâmetros, retornos, exceções).
* **Front-end:** Comente componentes complexos, *props* e o propósito de *hooks* customizados.

### Testes

* Sempre que possível, crie testes (unitários, de integração ou de feature) para suas novas funcionalidades ou correções de bugs.
* **Testes Laravel:** Utilize PHPUnit.
    * Para rodar todos os testes: `./vendor/bin/sail artisan test`
    * Para rodar testes de uma classe específica: `./vendor/bin/sail artisan test --filter NomeDaClasseDeTeste`
* **Testes React:** Utilize Jest e React Testing Library (se configurado).
    * Para rodar testes: `./vendor/bin/sail npm test`

## Processo de Submissão de Contribuições

1.  **Crie uma Nova Branch:**
    Baseie sua *branch* na *branch* `main` (ou `develop`, se houver):

    ```bash
    git checkout main
    git pull origin main # Garanta que sua branch main esteja atualizada
    git checkout -b feature/minha-nova-funcionalidade # Ou bugfix/correcao-do-bug-x
    ```

2.  **Desenvolva sua Contribuição:**
    Implemente as alterações, adicione testes e atualize a documentação conforme necessário.

3.  **Testes Locais:**
    Antes de submeter, execute os testes e garanta que todas as funcionalidades existentes ainda funcionam corretamente.

    ```bash
    ./vendor/bin/sail artisan test
    ./vendor/bin/sail npm test # Se houver testes no front-end
    ```

4.  **Mensagens de Commit:**
    Escreva mensagens de *commit* claras e descritivas. Uma boa prática é usar o padrão Conventional Commits (ex: `feat: adiciona funcionalidade X`, `fix: corrige bug Y`, `docs: atualiza documentação de Z`).
    * [Referência: Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

    ```bash
    git add .
    git commit -m "feat: Adiciona funcionalidade de comparação de trechos de código"
    ```

5.  **Envie sua Branch:**

    ```bash
    git push origin feature/minha-nova-funcionalidade
    ```

6.  **Abra um Pull Request (PR):**
    No GitHub, navegue até o seu repositório *forked* e abra um *Pull Request* da sua *branch* para a *branch* `main` (ou `develop`) do repositório oficial do TwinCode.

    * **Título do PR:** Seja descritivo (ex: "feat: Implementa módulo de comparação de código").
    * **Descrição do PR:** Explique detalhadamente o que suas alterações fazem, por que elas são necessárias, e como testá-las. Inclua capturas de tela, se relevante.
    * **Referência a Issues:** Se o PR fechar uma *issue* existente, adicione `Closes #XYZ` ou `Fixes #XYZ` na descrição do PR.

7.  **Revisão do Código:**
    Sua contribuição será revisada pela equipe do TwinCode. Esteja aberto a feedback e pronto para fazer ajustes, se necessário.

## Dúvidas e Suporte

Se tiver alguma dúvida durante o processo de contribuição, não hesite em abrir uma [Issue](https://github.com/alanfm/twincode/issues) no repositório do TwinCode ou entrar em contato através dos canais de comunicação da equipe.

Agradecemos novamente por sua dedicação em melhorar o TwinCode!