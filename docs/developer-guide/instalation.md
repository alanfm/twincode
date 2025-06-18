# <a id="top">Instalação do TwinCode</a>

Para instalar e configurar a ferramenta TwinCode em seu ambiente local, siga as instruções detalhadas abaixo. É fundamental ter o Docker instalado e configurado corretamente antes de prosseguir com as etapas do projeto.

## <a id="docker">Instalação do Docker</a>

Para a instalação do **Docker**, recomenda-se seguir as instruções oficiais disponíveis na documentação da ferramenta: [Documentação do Docker](https://docs.docker.com/).

Em casos específicos, como o uso do sistema operacional **Windows** com suporte ao **WSL2 (Windows Subsystem for Linux 2)**, é indicado consultar o seguinte tutorial, que fornece um guia prático e direto para configurar o ambiente corretamente: [Tutorial rápido do WSL2 + Docker](https://github.com/codeedu/wsl2-docker-quickstart).

Esses recursos fornecem orientações detalhadas para garantir uma instalação adequada e funcional do Docker em diferentes sistemas operacionais.

## <a id="config">Baixando, Configurando e Rodando o Projeto</a>

O código-fonte da ferramenta está disponível publicamente no GitHub, por meio do seguinte repositório: [https://github.com/alanfm/twincode](https://github.com/alanfm/twincode).

### <a id="clone">1. **Clonar o Repositório:**</a>

Para clonar o projeto em seu ambiente local, utilize o seguinte comando:

```bash
git clone https://github.com/alanfm/twincode
```

### <a id="deps">2. **Instalar Dependências PHP (Composer):**</a>

Após a conclusão do download, navegue até o diretório `twincode`. Em seguida, instale as dependências PHP utilizando o Composer. Execute o comando abaixo para realizar essa etapa:

```bash
docker run --rm --interactive --tty \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    composer \
    composer install --ignore-platform-reqs
```

Esse procedimento garante que todas as dependências do Laravel sejam instaladas corretamente, mesmo em ambientes que não possuam o PHP ou o Composer configurados nativamente.

### <a id="remove">3. **Remover Repositório Remoto Original (Opcional):**</a>

Caso deseje realizar alterações no projeto de forma independente, recomenda-se remover o repositório remoto original vinculado ao GitHub. Para isso, execute o seguinte comando no diretório raiz do projeto:

```bash
git remote remove origin
```

Essa ação desvincula o repositório local do repositório remoto original, permitindo que você configure um novo repositório remoto, caso deseje versionar suas modificações de maneira personalizada.

### <a id="laravel-config">4. **Configurações Iniciais do Laravel:**</a>

Crie uma cópia do arquivo de variáveis de ambiente padrão utilizando o seguinte comando:

```bash
cp .env.example .env
```

Em seguida, abra o arquivo `.env` no editor de código de sua preferência e ajuste os parâmetros conforme as configurações específicas do seu ambiente (como banco de dados, nome da aplicação, porta da aplicação, entre outros). Essas variáveis são essenciais para o correto funcionamento da aplicação e para garantir que os serviços sejam inicializados com os valores adequados ao contexto de execução.

### <a id="containers">5. **Iniciar os Containers da Aplicação:**</a>

Para iniciar os *containers* da aplicação, utilize o seguinte comando:

```bash
./vendor/bin/sail up
```

Esse comando inicializa todos os serviços definidos no ambiente Docker da aplicação, como o servidor web, banco de dados e demais dependências configuradas via Laravel Sail. Para mais informações sobre os comandos disponíveis no pacote Sail e suas funcionalidades, recomenda-se a leitura da documentação oficial: [Laravel Sail – Documentação](https://laravel.com/docs/12.x/sail).

Use o comando abaixo para gerar a chave de criptografia do sistema:

```bash
./vendor/bin/sail artisan key:generate
```

## <a id="npm">6. **Instalar Pacotes NPM (Node.js):**</a>

Agora é preciso instalar os pacotes NPM do projeto com o comando:

```bash
./vendor/bin/sail npm install
```

### <a id="migration">7. **Executar Migrações e Popular o Banco de Dados:**</a>

Para fazer a migração do banco de dados e povoá-lo com dados iniciais, use o comando abaixo:

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

Esse procedimento vai adicionar o usuário de e-mail: ```test@tes.t``` com a senha: ```qwe123```. Também será inserido algumas pesquisas fictícias para testes.

Caso não queira que seja criado pesquisas fictícias, abra o arquivo ```twincode/database/seeders/DatabaseSeeder.php``` e comente as linhas 25 a 27 e execute novamente o comando [acima](#migration).

### <a id="deps">8. **Rodar a Aplicação:**</a>

Por fim, podemos rodar a aplicação e visualizar as interfaces da ferramenta **TwinCode** com o seguinte comando:

```bash
./vendor/bin/sail composer run dev
```

Esse processo compila os arquivos de estilo e scripts JavaScript da aplicação, permitindo a visualização completa das interfaces da ferramenta no navegador.
