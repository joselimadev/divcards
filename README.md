# DIVCARDS

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

## Metricas Lighthouse e Web Vitals

As metricas abaixo foram extraidas do relatorio Lighthouse desktop publicado em 13 de marco de 2026, a partir do link:

```text
https://pagespeed.web.dev/analysis/https-divcards-vercel-app/pjk7xbpyra?form_factor=desktop
```

### Resultado geral

- Performance: 100/100

<img width="100%" alt="image" src="https://github.com/user-attachments/assets/4f9a057c-4773-4329-be7d-fa432de00330" />

### Desempenho

<img width="967" height="638" alt="image" src="https://github.com/user-attachments/assets/31aad49b-51f5-46e5-9647-203456eba0fe" />

- FCP: Marca o momento em que o primeiro texto ou imagem é disponibilizado.
- LCP: Marca o momento em que o maior texto ou imagem é exibido.
- TBT: Marca o tempo total em que uma página fica bloqueada para responder à entrada do usuário (cliques, toques na tela ou etc.).
- CLS: Marca o movimento de elementos visíveis na janela de visualização.
- SI: Marca a rapidez com que o conteúdo de uma página é preenchido visivelmente.

### Acessibilllidade

<img width="968" height="675" alt="image" src="https://github.com/user-attachments/assets/29227806-6553-4fd5-a8cd-5eb12fda7e45" />

A pontuação de acessibilidade do Lighthouse é uma média ponderada de todas as auditorias de acessibilidade. Por exemplo, se alguns botões em uma página tiverem nomes acessíveis, mas outros não, a página vai receber 0 na auditoria "Os botões não têm um nome acessível".

### Práticas recomendadas

<img width="966" height="793" alt="image" src="https://github.com/user-attachments/assets/44a76f29-ce45-4c9f-8fe6-df8153851341" />

A pontuação de práticas recomendadas do Lighthouse marca se o site utiliza tecnicas para proteger a integridade e segurança do site, evita bibliotecas antigas com vulnerabilidades conhecidas, evita erros no console, evita cookies de terceiros, etc.

### SEO

<img width="970" height="721" alt="image" src="https://github.com/user-attachments/assets/e7e26179-b8bb-4619-a536-8ecae054b858" />

A pontuação de SEO recomendadas do Lighthouse garantem que sua página siga orientações básicas para otimização de mecanismos de pesquisa.

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
