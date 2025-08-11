# eumedico/challenge

## Tabela de Conteúdo
- [Sobre](#sobre)
- [Rodando o Projeto Localmente](#rodando-o-projeto-localmente)
- [Arquitetura e Estrutura de Pastas](#arquitetura-e-estrutura-de-pastas)

## Sobre
Este projeto é um desafio técnico utilizando **Next.js** como framework, consumindo a API [Rick and Morty GraphQL](https://rickandmortyapi.com/graphql).

### Decisões de Implementação

#### Biblioteca de Componentes
Para acelerar o desenvolvimento e focar mais nas funcionalidades, optei por usar o **shadcn/ui** com personalizações para dar um estilo mais “cartoon”.
Assim, não precisei me preocupar com acessibilidade e testes unitários para cada componente básico, pois a própria biblioteca já cuida desses pontos.
Pude focar os testes unitários nos **componentes compostos**, como filtros, lista e card de personagem.

#### Server Components
Todas as requisições para a API são feitas no **server**.
As funções foram abstraídas para facilitar a escrita de testes unitários e são chamadas nos *server components*, permitindo que o **fetch** seja feito no servidor e que a página já chegue ao navegador renderizada com os dados necessários.

Isso evita chamadas no client que poderiam causar *re-renders* desnecessários e também simplifica o tratamento de questões de SEO (mesmo que não fosse essencial para este desafio).

#### Testes
- **Unitários:**
  Utilizei **Vitest** pela performance superior em relação ao Jest, junto com **@testing-library/react** para focar no comportamento do usuário.
  Também criei testes para a função de paginação e para os *services* que fazem requisições à API.
  Para evitar chamadas reais à API, usei **MSW** para interceptar as requisições e retornar dados mockados em conformidade com o contrato da API.

- **E2E:**
  Utilizei **Playwright** por ser simples, ter uma API semelhante à do `@testing-library/user-event` e permitir testes baseados no que o usuário realmente vê na tela (textos, placeholders, etc.) — sem depender de `data-testid`.

## Rodando o Projeto Localmente
Para executar este projeto, é recomendado ter o **pnpm** instalado (mas `npm` também deve funcionar normalmente).

Após clonar o repositório, execute:

```bash
pnpm install
pnpm run dev # Aplicação disponível em http://localhost:3000
```

## Rodando os Testes

```bash
pnpm run test         # Executa os testes unitários
pnpm run test:e2e-ui  # Executa os testes E2E no navegador via Playwright
```

## Arquitetura e Estrutura de Pastas
A estrutura foi pensada para manter clareza, baixa acoplamento e facilidade de teste:

```bash
src/
 ├─ app/                # Páginas e rotas do Next.js (Server Components)
 │   ├─ (home)
 │   ├─── page.tsx      # Página inicial
 │   ├─── loading.tsx   # loading da página inicial
 │   ├─ [character]
 │   ├─── page.tsx      # Página de detalhes de personagem
 │   ├─── loading.tsx   # loading da página de detalhes
 │   ├─ layout          # layout base da aplicação
 │
 ├─ components/             # Componentes reutilizáveis
 │   ├─ search.tsx          # Componente de search
 │   ├─ filter.tsx          # Filtros de busca (status, gênero, nome)
 │   ├─ filter-checkbox.tsx # Componente de filtro reutilizável
 │   ├─ character-card.tsx  # Card individual de personagem
 │   ├─ characters-list.tsx # Componente para listagem de personagens
 │   ├─ ui/                 # Componentes de UI do shadcn customizados
 │
 ├─ hooks/                  # Hooks customizados
 │   └─ use-query-string.ts # Manipulação de parâmetros na URL
 │
 ├─ services/            # Funções de acesso à API
 │   ├─ characters.ts    # Query de lista de personagens
 │   └─ character.ts     # Query de personagem único
 │
 ├─ lib/                 # Configurações e utilitários
 │   └─ pages.ts         # Função utilitária para tratar a paginação e retornar os valores visíveis
 │   └─ urql.ts          # Cliente URQL configurado
 │
 ├─ tests/               # Testes unitários e mocks
 │   ├─ unit/            # Testes unitários com Vitest
 │   ├─ e2e/             # Testes E2E com Playwright
 │   ├─ fixtures/        # Dados mockados para os testes
 │   ├─ msw/             # Configuração do msw
 │   └─ setup.ts         # Configuração dos testes unitários
 │
 └─ types/              # Tipagens compartilhadas (Typescript)
     └─ response.ts     # Tipos da API
```
