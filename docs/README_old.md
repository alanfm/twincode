# TwinCode

## Descrição

**TwinCode** é uma ferramenta computacional desenvolvida com o objetivo de apoiar pesquisas empíricas na área de Engenharia de Software, especialmente aquelas voltadas à análise da qualidade de código. Sua principal funcionalidade consiste em possibilitar a comparação entre dois trechos de código-fonte, de forma estruturada e controlada. A interface da ferramenta foi projetada para apresentar os códigos lado a lado, permitindo que o participante da pesquisa observe e avalie as diferenças entre eles de maneira clara e objetiva.

O objetivo principal do **TwinCode** é disponibilizar uma interface que facilita a condução de estudos empíricos em Engenharia de Software, especialmente aqueles focados na avaliação da qualidade de código, percepção de desenvolvedores, e análise de práticas de refatoração ou detecção de *code smells*.

A ferramenta foi desenvolvida com base na separação entre as camadas de *front-end* e *back-end*, seguindo boas práticas de desenvolvimento de software modular e manutenível. A camada de *back-end* foi implementada utilizando a linguagem [PHP](https://www.php.net/), escolhida por seu ecossistema consolidado, ampla documentação e grande comunidade ativa, fatores que facilitam a integração com bibliotecas e *frameworks* modernos, além de promover maior suporte técnico e manutenção ao longo do ciclo de vida do sistema. Essa escolha também visa garantir escalabilidade e flexibilidade no desenvolvimento de funcionalidades voltadas à manipulação de dados e à integração com bancos de dados relacionais.

O *framework* utilizado na implementação do *back-end* foi o [**Laravel**](https://laravel.com/), uma das ferramentas mais consolidadas e amplamente utilizadas no ecossistema PHP, destacando-se por sua robustez, clareza arquitetural e suporte ao padrão MVC. No *front-end*, foi adotada a combinação do [**InertiaJS**](https://inertiajs.com) com o [**ReactJS**](https://react.dev/), permitindo a construção de uma interface moderna e reativa sem a necessidade de uma *API REST* tradicional, ao integrar diretamente as rotas e respostas do Laravel com componentes do **React**. A estilização da interface foi realizada utilizando o *framework* [**Tailwind CSS**](https://tailwindcss.com/), que adota uma abordagem *utility-first*, promovendo rapidez no desenvolvimento e padronização visual. Como sistema de gerenciamento de banco de dados, foi utilizado o [**MariaDB**](https://mariadb.org/), uma solução relacional de código aberto conhecida por sua performance, estabilidade e compatibilidade com o **MySQL**.

Para a execução e orquestração do ambiente de desenvolvimento, foi utilizada a tecnologia de contêineres [**Docker**](https://www.docker.com/), em conjunto com o pacote oficial do Laravel chamado [**Sail**](https://laravel.com/docs/12.x/sail). Essa combinação permitiu a configuração simplificada de todos os serviços necessários — como servidor web, banco de dados e ambiente PHP — de forma padronizada, reproduzível e isolada. O uso do Docker com o Laravel Sail facilitou a instalação, o gerenciamento de dependências e a portabilidade da aplicação entre diferentes ambientes, contribuindo para maior eficiência no desenvolvimento colaborativo e na implantação do sistema.

## Instalação

Para fazer a instalação da ferramenta TwinCode, primeiramente deve-se ter instalado no computador o **Docker**:

### Instalação do Docker

Para a instalação do **Docker**, recomenda-se seguir as instruções oficiais disponíveis na documentação da ferramenta: [Documentação do Docker](https://docs.docker.com/).

Em casos específicos, como o uso do sistema operacional **Windows** com suporte ao **WSL2 (Windows Subsystem for Linux 2)**, é indicado consultar o seguinte tutorial, que fornece um guia prático e direto para configurar o ambiente corretamente: [Tutorial rápido do WSL2 + Docker](https://github.com/codeedu/wsl2-docker-quickstart).

Esses recursos fornecem orientações detalhadas para garantir uma instalação adequada e funcional do Docker em diferentes sistemas operacionais.

### Baixando, configurando e rodando o projeto

O código-fonte da ferramenta está disponível publicamente no GitHub, por meio do seguinte repositório: [https://github.com/alanfm/twincode](https://github.com/alanfm/twincode). Para clonar o projeto em seu ambiente local, utilize o seguinte comando:

```bash
git clone https://github.com/alanfm/twincode
```

Após a conclusão do download, vá para o diretório ``twincode``, e então instale as dependências PHP utilizando o Composer. Execute o comando abaixo para realizar essa etapa:

```bash
docker run --rm --interactive --tty \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    composer \
    composer install --ignore-platform-reqs
```

Esse procedimento garante que todas as dependências do Laravel sejam instaladas corretamente, mesmo em ambientes que não possuam o PHP ou o Composer configurados nativamente.

Caso deseje realizar alterações no projeto de forma independente, recomenda-se remover o repositório remoto original vinculado ao GitHub. Para isso, execute o seguinte comando no diretório raiz do projeto:

```bash
git remote remove origin
```

Essa ação desvincula o repositório local do repositório remoto original, permitindo que você configure um novo repositório remoto, caso deseje versionar suas modificações de maneira personalizada.

Após a execução dos passos anteriores, é necessário realizar as configurações iniciais do Laravel. Para isso, primeiramente, crie uma cópia do arquivo de variáveis de ambiente padrão utilizando o seguinte comando:

```bash
cp .env.example .env
```

Em seguida, abra o arquivo `.env` no editor de código de sua preferência e ajuste os parâmetros conforme as configurações específicas do seu ambiente (como banco de dados, nome da aplicação, porta da aplicação, entre outros). Essas variáveis são essenciais para o correto funcionamento da aplicação e para garantir que os serviços sejam inicializados com os valores adequados ao contexto de execução.

Para iniciar os *containers* da aplicação, utilize o seguinte comando:

```bash
./vendor/bin/sail up
```

Esse comando inicializa todos os serviços definidos no ambiente Docker da aplicação, como o servidor web, banco de dados e demais dependências configuradas via Laravel Sail.

Para mais informações sobre os comandos disponíveis no pacote Sail e suas funcionalidades, recomenda-se a leitura da documentação oficial: [Laravel Sail – Documentação](https://laravel.com/docs/12.x/sail).


Esse processo compila os arquivos de estilo e scripts JavaScript da aplicação, permitindo a visualização completa das interfaces da ferramenta no navegador.

Agora é preciso instalar os pacotes NPM do projeto com o comando:

```bash
./vendor/bin/sail npm install
```

Também é preciso fazer a migração do banco de dados, para rodar o banco de dados **povoado** use o comando abaixo:

```bash
./vendor/bin/sail artisa migrate:fresh --seed
```

E por fim podemos rodar a aplicação e visualizar as interfaces da ferramenta **TwinCode** com o seguinte comando:

```bash
./vendor/bin/sail composer run dev
```


### Rodando a aplicação


## Como Usar

[Usage instructions]

## Requisitos

[System requirements]

## Como Contribuir

[Contributing guidelines]
