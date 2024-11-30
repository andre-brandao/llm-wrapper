# Deds GPT

Projeto desenvolvido para a matéria de TOPICOS 3 na PUC-MG

![Preview](static/image.png)

## Instruções

### Instalando o projeto

Garanta que você tem [NodeJS](https://nodejs.org/en) ou [Bun](https://bun.sh/) instalado na sua maquina

Faça um clone do projeto localmente e instale as dependencias utilizando algum package manager de sua escolha

```bash
npm install
# ou
pnpm install
# ou
bun install
```

### Antes de rodar a aplicação

Para rodar o projeto localmente é necessario adicionar uma chave da Anthropic(https://www.anthropic.com/) no arquivo .env (A conta precisa ter creditos, caso contrario o bot não respondera nada)

Recomendo apenas renomear o .env.exemple para env e adicionar a chave da api

.env deve ficar assim

```txt
ANT_KEY="sk_YOUR_ANTROPIC_KEY...."
```

### Iniciando a aplicação em mode de desenvolvimento

Para rodar a aplicação localmente basta utilizar o comando de dev localizado no arquivo package.json ou usando o package manager

```bash
npm run dev
# ou
pnpm run dev
# ou
bun run dev
```
