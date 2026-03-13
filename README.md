# divcards

Aplicacao web de flashcards com interface interativa para estudo de palavras, descricoes e casos de uso. O projeto consome uma API externa, organiza os cards em pilha animada e permite navegar entre eles diretamente pela interface.

## Participantes

- Bruna Amancio Silva
- José Carlos De Oliveira Lima
- Luis Felipe dos Santos Robbo
- Luis Henrique Secundes

## Finalidade do projeto

O objetivo do `divcards` e oferecer uma experiencia simples de estudo com flashcards, exibindo termos, descricoes e exemplos de uso em um layout visual moderno. A aplicacao busca os dados de uma API remota e atualiza o deck exibido para o usuario.

## Stack utilizada

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- TanStack React Query
- ESLint

## Como executar o projeto

### Pre-requisitos

- Node.js 20 ou superior
- pnpm instalado globalmente

### Instalacao

```bash
pnpm install
```

### Ambiente de desenvolvimento

```bash
pnpm dev
```

Depois, acesse o endereco exibido no terminal, normalmente:

```text
http://localhost:3000
```

### Build de producao

```bash
pnpm build
```

Os arquivos otimizados para publicacao serao gerados na pasta `dist/`.

### Preview local da build

```bash
pnpm preview
```

## Estrutura basica

```text
src/
  App.tsx                         # interface principal
  main.tsx                        # bootstrap do React e React Query
  hooks/
    use-flashcards-query.ts       # consumo e validacao da API
    use-card-stack-motion.ts      # logica de animacao da pilha de cards
```

## API consumida

Atualmente, os flashcards sao carregados a partir do endpoint:

```text
https://fiap-bff-2502.onrender.com/ask
```

Caso a API fique indisponivel ou retorne um formato invalido, a aplicacao exibe uma mensagem de erro na interface.

## Como realizar o deploy

Como este projeto utiliza Vite, o deploy e estatico. Isso significa que o processo de publicacao consiste em gerar a build e hospedar o conteudo da pasta `dist/` em um servico de hospedagem front-end.

### Passo a passo

1. Instale as dependencias:

```bash
pnpm install
```

2. Gere a build:

```bash
pnpm build
```

3. Publique a pasta `dist/` em uma plataforma de hospedagem estatica, como Vercel, Netlify, GitHub Pages ou outro servidor web.

### Exemplo de deploy na Vercel

- Importe o repositorio na Vercel.
- Configure o comando de build como `pnpm build`.
- Configure o diretorio de saida como `dist`.
- Finalize o deploy pela interface da plataforma.

## Scripts disponiveis

- `pnpm dev`: inicia o servidor de desenvolvimento
- `pnpm build`: executa a compilacao TypeScript e gera a build de producao
- `pnpm preview`: inicia uma visualizacao local da build
- `pnpm lint`: executa a validacao de lint
