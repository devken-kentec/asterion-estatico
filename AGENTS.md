# Diretrizes do Repositório

## Estrutura do Projeto e Organização dos Módulos

Este repositório contém uma aplicação de página única em Angular 19. A inicialização e as rotas da aplicação ficam em `src/main.ts`, `src/app/app.config.ts` e `src/app/app.routes.ts`. O código é organizado por funcionalidade em `src/app/modulos/` (por exemplo, `receita`, `despesa` e `periodo`), com arquivos de rotas, serviços e componentes junto de cada funcionalidade. Os modelos de domínio compartilhados ficam em `src/app/domain/`, e os serviços usados por várias funcionalidades ficam em `src/shared/`. Os estilos globais ficam em `src/styles.css`; arquivos estáticos, como imagens e o favicon, ficam em `public/` (atualmente, em `public/imagens/`). Mantenha os modelos e estilos específicos de cada funcionalidade junto ao respectivo componente.

## Comandos de Desenvolvimento, Teste e Build

Execute os comandos na raiz do repositório, após instalar as dependências com `npm install`.

- `npm start` — inicia o servidor de desenvolvimento em `http://localhost:4200/`, com recarga automática.
- `npm run build` — gera a versão de produção em `dist/asterion` e verifica os limites configurados para os pacotes e estilos.
- `npm run watch` — recompila continuamente usando a configuração de desenvolvimento.
- `npm test` — executa os testes unitários com Angular CLI, Karma e Jasmine em um navegador.

## Estilo de Código e Convenções de Nomenclatura

Siga os padrões existentes de Angular e TypeScript: use indentação de dois espaços, ponto e vírgula e aspas simples no TypeScript. Mantenha componentes, modelos, estilos e serviços nas pastas de suas funcionalidades. Use nomes de arquivo em kebab-case, como `receita-form.component.ts`; use PascalCase para classes e tipos de domínio, e camelCase para variáveis, métodos e membros de serviços. Prefira os geradores do Angular CLI ao criar artefatos Angular para manter os nomes e a estrutura esperados. O `package.json` não configura formatador nem linter separado.

## Diretrizes de Teste

O projeto está configurado para Jasmine/Karma, mas atualmente não há arquivos `*.spec.ts`. Crie testes unitários focados junto ao código testado, seguindo a convenção `*.spec.ts` do Angular (por exemplo, `receita.service.spec.ts`), e execute `npm test`. Cubra o comportamento relevante dos serviços e as interações dos componentes; não há limite mínimo de cobertura configurado. Não há configuração de testes de ponta a ponta.

## Commits e Pull Requests

As mensagens recentes do Git são curtas e informais, sem uma convenção consistente. Escreva títulos concisos no imperativo que expliquem a mudança, de preferência em português para acompanhar o contexto do projeto (por exemplo, `Corrige filtro por período`). Mantenha cada commit focado. Pull requests devem resumir as mudanças visíveis para quem usa o sistema e as mudanças técnicas, incluir um link para a issue relacionada quando houver, listar as validações realizadas e incluir capturas de tela para mudanças na interface.

## Configuração e Arquivos Estáticos

Não inclua segredos nem credenciais locais no repositório. Consulte `src/environments/` ao alterar configurações específicas de ambiente. Use os caminhos em `public/` para referenciar arquivos estáticos e não inclua no controle de versão os arquivos gerados em `dist/`.
