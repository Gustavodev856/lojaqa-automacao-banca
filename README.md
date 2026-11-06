\# LojaQA - Automação de Testes



Projeto de automação de testes utilizando \*\*Playwright, TypeScript e Node.js\*\*, desenvolvido para validar funcionalidades de uma plataforma de e-commerce.



\## Tecnologias utilizadas



\- Node.js

\- TypeScript

\- Playwright

\- Dotenv

\- Git e GitHub



\## Estrutura do projeto



```text

lojaqa-automacao-banca/

├── desafio-mercado/

│   ├── playwright.desafio.config.ts

│   ├── wiki-api.spec.ts

│   └── wikipedia-site.spec.ts

├── fixtures/

├── pages/

├── tests/

│   ├── api/

│   └── e2e/

├── .env.example

├── .gitignore

├── package.json

├── package-lock.json

├── playwright.config.ts

└── tsconfig.json

```



\## Instalação



Clone o repositório:



```bash

git clone https://github.com/Gustavodev856/lojaqa-automacao-banca.git

```



Entre na pasta:



```bash

cd lojaqa-automacao-banca

```



Instale as dependências:



```bash

npm ci

```



Instale o navegador Chromium:



```bash

npx playwright install chromium

```



\## Configuração das variáveis de ambiente



Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência.



Preencha as variáveis necessárias:



```env

API\_BASE\_URL=

UI\_URL=

SELLER\_EMAIL=

SELLER\_PASSWORD=

```



Não compartilhe credenciais reais no GitHub.



\## Execução dos testes



Executar todos os testes:



```bash

npm test

```



Executar testes E2E:



```bash

npm run test:e2e

```



Executar testes de API:



```bash

npm run test:api

```



Executar desafio de mercado - Site:



```bash

npm run test:desafio:site

```



Executar desafio de mercado - API:



```bash

npm run test:desafio:api

```



\## Autor



\*\*Gustavo Vasconcelos\*\*



GitHub: https://github.com/Gustavodev856

