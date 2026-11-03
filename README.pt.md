# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Plugins e recursos para o [Mongo Manager](https://github.com/mongo-manager/mongo-manager), o gerenciador de MongoDB auto-hospedado que roda no navegador.

Um plugin adiciona uma visualização, uma ação ou uma página ao Mongo Manager: um mapa dos locais de uma coleção, um gráfico, um localizador de duplicados. É uma pasta de arquivos estáticos que o app mostra em um frame isolado (sandbox), sem código no servidor e sem acesso próprio à rede (só a um endereço definido por um administrador, como o servidor de blocos de um mapa), e só roda depois que um administrador aprova exatamente seus arquivos e as permissões que ele pede.

**Estar nesta lista não é uma revisão nem um endosso.** O app verifica cada plugin antes que um administrador o aprove, mas a verificação encontra padrões conhecidos, não intenções. Leia o plugin, e a verificação dele na página Plugins, antes de aprová-lo.

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · Português · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## Conteúdo

<!-- toc:start -->
- [Plugins oficiais](#plugins-oficiais)
  - [Consultas e busca](#consultas-e-busca)
  - [Gráficos e mapas](#gráficos-e-mapas)
  - [Documentos e valores](#documentos-e-valores)
  - [Esquema e qualidade dos dados](#esquema-e-qualidade-dos-dados)
  - [Privacidade e dados de teste](#privacidade-e-dados-de-teste)
  - [Operações e desempenho](#operações-e-desempenho)
- [Plugins da comunidade](#plugins-da-comunidade)
- [Instalar um plugin](#instalar-um-plugin)
- [Criar um plugin](#criar-um-plugin)
<!-- toc:end -->

## Plugins oficiais

Vêm com o Mongo Manager: já estão no seu servidor, e um administrador ativa cada um na página Plugins.

<!-- official:start -->

### Consultas e busca

- [Filtros de data](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/date-presets) - Coloca na consulta de Documentos os intervalos de datas usados para filtrar (hoje, ontem, os últimos 7 dias, este mês, as últimas n horas ou dias, entre dois dias) em um campo de data, ou em _id conforme o momento em que seus documentos foram criados.
- [Busca de valores](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/value-search) - Procura um texto, um número ou um ObjectId em todos os campos dos documentos de uma coleção e mostra onde foi encontrado.
- [SQL para MongoDB](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/sql-to-mongodb) - Converte instruções SELECT em consultas do MongoDB e código de driver, executa-as somente leitura na coleção aberta (um JOIN também lê a coleção que nomeia, do mesmo banco de dados) e as leva para Documentos ou Agregações.
- [Playground de busca](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/search-playground) - Testa os índices de busca de uma coleção: busca de texto completo em um campo ou em todos, com erros de digitação permitidos e destaques, ou busca vetorial com um vetor colado ou um documento da coleção. Resultados com sua pontuação e o pipeline vai para Agregações.
- [Remodelar](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/reshape) - Renomeia, nivela, aninha, converte ou remove campos de uma coleção em etapas que você visualiza em documentos de amostra e as envia para Agregações como um pipeline; lá, um $out que você adicionar grava uma nova coleção. A coleção em si nunca é alterada.

### Gráficos e mapas

- [Gráficos](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/charts) - Cria gráficos com os valores de uma coleção — barras, linha ao longo do tempo, rosca, histograma, dispersão — com uma tabela de resumo, dentro da consulta atual.
- [Mapa](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/geojson-map) - Desenha em um mapa os campos GeoJSON e os pares \[lng, lat\] dos documentos de uma coleção e os filtra por uma área desenhada nele.

### Documentos e valores

- [Comparação de documentos](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-diff) - Compara um documento com outro da sua coleção, campo a campo: o que foi adicionado, removido ou alterado, incluindo valores aninhados e arrays.
- [Referências](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/references) - Encontra os campos que contêm ObjectIds de outros documentos e as coleções às quais fazem referência; mostra o nome do documento referenciado ao lado de cada id, e um ausente é indicado como tal; lista os documentos que fazem referência a um.
- [Dicas de tempo](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/time-hints) - Ao apontar para um ObjectId, mostra quando ele foi criado; ao apontar para um número que se lê como hora Unix, mostra a data.
- [Hora local](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/local-time) - Mostra cada data no seu horário local, ou em um fuso horário que você definir, com a diferença em relação ao UTC, em uma dica ou ao lado do valor; opcionalmente, há quanto tempo foi.
- [Pré-visualização de binários](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/binary-preview) - Informa o que um valor binário contém — o tipo e o tamanho de uma imagem, um PDF, um arquivo compactado — ao apontar para ele, e mostra as imagens armazenadas nos documentos de uma coleção, ou em um único documento, desenhadas a partir dos próprios bytes.
- [UUIDs legados](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/legacy-uuid) - Lê os UUIDs legados que drivers antigos armazenavam (subtipo binário 3) nas ordens de bytes de Java, C# e Python, descobre em qual ordem um campo foi gravado e encontra um UUID independentemente de como foi armazenado.
- [Tamanho do documento](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-size) - Qual o tamanho dos documentos de uma coleção — sua distribuição, os maiores, a proximidade do limite de 16 MB — e para onde vão seus bytes, campo a campo e dentro de campos de objeto, nomes incluídos, medido no servidor.

### Esquema e qualidade dos dados

- [Integridade do esquema](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/schema-health) - Verifica uma amostra de uma coleção, o tamanho dos documentos e os índices em busca dos antipadrões de esquema citados na documentação do MongoDB: documentos e arrays grandes, aninhamento profundo, tipos mistos, índices sem uso e redundantes.
- [Verificação de validação](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/validation-inspector) - Verifica um a um os documentos de uma coleção com as regras de validação (em uma amostra aleatória ou em todos) e informa quantos violam cada regra, com esses documentos a um clique em Documentos.
- [Localizador de duplicados](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/duplicate-finder) - Encontra os documentos que compartilham valores em campos que deveriam ser únicos, conta e mostra primeiro os mais repetidos.
- [Dicionário de dados](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/data-dictionary) - Documenta um banco de dados: os campos de cada coleção com seus tipos e presença, o que suas regras de validação dizem sobre eles, as referências entre coleções, os índices e as regras. Aparece em uma aba e pode ser salvo como Markdown ou HTML.

### Privacidade e dados de teste

- [Localizador de dados pessoais](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/personal-data) - Encontra, em uma amostra aleatória, os campos de uma coleção que contêm dados pessoais (e-mails, telefones, cartões, IBANs, identidades, nomes, endereços, senhas), mostra só exemplos mascarados e sugere os campos escolhidos como regras de dados pessoais.
- [Anonimizador](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/anonymiser) - Cria uma cópia anonimizada de uma coleção para testes ou compartilhamento: valores fictícios realistas que mantêm o formato, hashes consistentes, valores embaralhados, datas deslocadas e ruído numérico; salva como NDJSON ou JSON, ou importa para uma nova coleção.
- [Dados de teste](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/mock-data) - Cria documentos de teste realistas no formato dos de uma coleção — nomes, e-mails, endereços, preços, datas e mais, a partir de mais de 100 modelos em dez idiomas — e os entrega ao assistente de importação, onde você confere e inicia a importação.

### Operações e desempenho

- [Script de índices](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/index-script) - Escreve os índices de uma coleção, ou de um banco de dados inteiro, como os comandos que os criam novamente — para o mongosh, o driver do Node.js ou do Python, ou como JSON — para copiar ou salvar, em outro ambiente ou em uma migração.
- [Relatório de armazenamento](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/storage-report) - Mostra o que cada coleção de um banco de dados ocupa em disco, o espaço livre que o WiredTiger mantém nos arquivos dela e nos dos índices, e qual parte isso representa. Para uma coleção, estima o que a compactação devolveria e a compacta depois que o app pergunta e você digita o nome dela.
- [Expiração (TTL)](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/ttl-view) - Mostra quando os índices TTL de uma coleção removem seus documentos (já expirados, na hora, no dia, na semana, mais tarde) e quais nunca removem; cada grupo a um clique em Documentos.
- [Analisador de chaves de shard](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/shard-key-analyzer) - Compara as chaves de shard candidatas de uma coleção pelo que o analyzeShardKey do MongoDB informa (valores distintos, frequência do valor mais comum, se a chave cresce a cada inserção) e avalia cada uma conforme as orientações do MongoDB.
- [Analisador de logs](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/log-analyzer) - Lê um arquivo de log do mongod ou do mongos no seu navegador (ele nunca sai dele) e mostra as operações lentas agrupadas por forma de consulta, os erros e avisos, as conexões e uma linha do tempo.

<!-- official:end -->

## Plugins da comunidade

Os plugins feitos por outras pessoas, cada um em seu próprio repositório, estão na [lista em inglês](README.md#community-plugins). Cada entrada é verificada com o próprio código do app em relação à versão mais recente do Mongo Manager: sua versão mais recente contém um único arquivo de plugin, o app aceita seu manifesto e a verificação do app não encontra nele nenhum risco alto.

## Instalar um plugin

Na página **Plugins**, um administrador escolhe **Enviar plugin** e fornece o arquivo `.tgz` da versão do plugin no GitHub, ou escolhe **Instalar do GitHub** e fornece o endereço do repositório (isso fica desativado a menos que o servidor defina `MM_PLUGINS_GITHUB=1`).

No próprio servidor, a pasta do plugin, com o id dele como nome, também pode ser colocada na pasta `plugins` do diretório de dados; depois, escolha **Verificar novamente**.

Seja qual for o caminho, o plugin chega desativado, é verificado e aguarda a aprovação de um administrador. Qualquer mudança em seus arquivos exige uma nova aprovação.

## Criar um plugin

Na página Plugins, em **Crie seu próprio plugin**, escolha **Ler o guia do desenvolvedor** para ver tudo o que um plugin pode fazer: o manifesto, a ponte, as permissões, o sandbox, a verificação, o empacotamento e a publicação.

- [Modelo inicial](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - Um plugin funcional em JavaScript simples, sem etapa de build nem dependências, com instruções para assistentes de programação com IA. Também está na página Plugins, como **Baixar o modelo inicial (.zip)**.
- [Código-fonte dos plugins oficiais](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Todos os plugins acima, com seus testes.

## Contribuir

Contribuições são bem-vindas! Leia primeiro as [diretrizes de contribuição](CONTRIBUTING.md) (em inglês). Para adicionar um plugin, abra um pull request que adicione uma linha ao README.md.
