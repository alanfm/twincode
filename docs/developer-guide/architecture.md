# Arquitetura e Tecnologias do TwinCode

O TwinCode foi projetado com uma arquitetura robusta e modular, visando facilitar o desenvolvimento, a manutenção e a escalabilidade. A separação clara entre as camadas de *front-end* e *back-end*, aliada à escolha de tecnologias consolidadas, permite um ambiente de desenvolvimento eficiente e um produto final de alta qualidade.

## Arquitetura Geral

O sistema segue um padrão de arquitetura *Monolito com Front-end SPA* (Single Page Application), onde o Laravel no *back-end* não apenas gerencia a lógica de negócio e o banco de dados, mas também serve as páginas do *front-end* via InertiaJS, que atua como uma ponte entre o Laravel e os componentes React.

## Tecnologias Detalhadas

### Back-end

O *back-end* do TwinCode é o coração da lógica de negócio, responsável pela manipulação dos dados de código, gerenciamento de questionários, processamento de respostas e, potencialmente, a integração com ferramentas de análise de qualidade de código.

* **Linguagem:** [PHP](https://www.php.net/)
    * **Justificativa:** Escolhido por sua maturidade, performance e vasta comunidade. A grande quantidade de bibliotecas e recursos disponíveis acelera o desenvolvimento e garante suporte a longo prazo.
* **Framework:** [Laravel](https://laravel.com/)
    * **Justificativa:** Laravel é um *framework* PHP que se destaca pela sua elegância e facilidade de uso, promovendo um desenvolvimento rápido sem sacrificar a robustez. Ele implementa o padrão de arquitetura MVC (Model-View-Controller) de forma eficaz, fornecendo recursos como ORM (Object-Relational Mapping), sistema de rotas, *middlewares*, autenticação, e um ecossistema rico de pacotes. Isso facilita a organização do código e a implementação de funcionalidades complexas. [Referência: Documentação Oficial do Laravel](https://laravel.com/docs/12.x)

### Front-end

A interface do usuário do TwinCode foi construída para ser intuitiva e reativa, proporcionando uma experiência fluida para pesquisadores e participantes.

* **Framework JavaScript:** [ReactJS](https://react.dev/)
    * **Justificativa:** ReactJS é uma biblioteca JavaScript declarativa, eficiente e flexível para a construção de interfaces de usuário. Permite a criação de componentes reutilizáveis e gerencia o estado da interface de forma eficaz, otimizando a experiência do usuário, especialmente em aplicações Single Page Applications (SPAs). [Referência: Documentação Oficial do React](https://react.dev/learn)
* **Adaptador SPA:** [InertiaJS](https://inertiajs.com)
    * **Justificativa:** InertiaJS atua como uma "cola" entre o Laravel e o React. Ele permite construir SPAs sem a complexidade de APIs REST tradicionais. O Laravel renderiza "páginas" Inertia que são na verdade componentes React, enviando dados diretamente do controlador Laravel para as *props* dos componentes React. Isso simplifica o roteamento, a validação de formulários e a autenticação, pois o Laravel continua sendo a fonte da verdade para o estado da aplicação. [Referência: Documentação Oficial do Inertia.js](https://inertiajs.com/getting-started)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
    * **Justificativa:** Tailwind CSS é um *framework* CSS *utility-first* que fornece classes de utilidade de baixo nível para construir designs personalizados diretamente no seu HTML. Isso acelera o processo de estilização, promove a consistência visual e reduz a necessidade de escrever CSS personalizado extenso, tornando o desenvolvimento do *front-end* mais ágil e manutenível. [Referência: Documentação Oficial do Tailwind CSS](https://tailwindcss.com/docs)

### Banco de Dados

* **Sistema de Gerenciamento de Banco de Dados:** [MariaDB](https://mariadb.org/)
    * **Justificativa:** MariaDB é um sistema de banco de dados relacional de código aberto, derivado do MySQL. É conhecido por sua alta performance, robustez, segurança e compatibilidade com MySQL, o que o torna uma escolha excelente para aplicações web que exigem um gerenciamento de dados confiável e escalável. Sua compatibilidade com o Laravel é nativa e eficiente. [Referência: Documentação Oficial do MariaDB](https://mariadb.com/kb/en/documentation/)

### Ambiente de Desenvolvimento e Orquestração

Para garantir um ambiente de desenvolvimento padronizado, reproduzível e isolado, o TwinCode utiliza contêineres Docker.

* **Tecnologia de Contêineres:** [Docker](https://www.docker.com/)
    * **Justificativa:** Docker permite empacotar a aplicação e suas dependências em "contêineres" isolados, garantindo que o software funcione de forma consistente em diferentes ambientes. Isso elimina problemas de "funciona na minha máquina" e simplifica a configuração do ambiente de desenvolvimento para todos os colaboradores. [Referência: Documentação Oficial do Docker](https://docs.docker.com/)
* **Orquestrador Laravel:** [Laravel Sail](https://laravel.com/docs/12.x/sail)
    * **Justificativa:** Laravel Sail é uma interface de linha de comando leve para interagir com o ambiente de desenvolvimento Docker do Laravel. Ele fornece uma maneira simples de iniciar e gerenciar todos os serviços necessários (PHP, Nginx, MariaDB, Redis, etc.) com um único comando, tornando a configuração do ambiente de desenvolvimento incrivelmente rápida e eficiente para o TwinCode. [Referência: Documentação Oficial do Laravel Sail](https://laravel.com/docs/12.x/sail)
