<div align="center">
  <h1>Whistle 🎧 - Seu Companheiro Musical no Discord</h1>
  <img src="https://i.imgur.com/XwWEaX2.jpeg" alt="Whistle o Guaxinim" width="250"/>
  <p>Um bot de música simples e poderoso para o seu servidor Discord, pronto para tocar suas faixas favoritas do YouTube e Spotify!</p>
</div>

---

## ✨ Sobre o Whistle

O Whistle é um bot de música dedicado a trazer a trilha sonora perfeita para o seu servidor Discord. Construído com `discord.js` e `play-dl`, ele é leve, eficiente e fácil de usar. Chega de silêncio nos canais de voz!

### 🎵 Funcionalidades Principais

- **Toca Músicas:** Reproduz músicas diretamente do YouTube e Spotify.
- **Controle de Fila:** Adiciona e gerencia uma fila de reprodução para manter a festa rolando.
- **Comandos Simples:** Comandos intuitivos em barra (`/`) para fácil interação.
- **Qualidade de Áudio:** Streams de áudio limpos e claros para a melhor experiência.

---

## 🚀 Como Adicionar o Whistle ao Seu Servidor

1.  **Link de Convite:** Clique neste link para convidar o Whistle para o seu servidor:
    [Link de Convite do Whistle AQUI](https://discord.com/oauth2/authorize?client_id=1438155809589559439&permissions=3148800&integration_type=0&scope=bot)
    _(Você pode gerar este link no Portal de Desenvolvedores do Discord, na seção OAuth2 -> URL Generator, selecionando os scopes `bot` e `applications.commands`, e as permissões de bot `Connect`, `Speak`, `Send Messages`, `View Channels`)_

2.  **Permissões:** Garanta que o Whistle tenha as permissões necessárias para:
    - Entrar e Falar em canais de voz.
    - Enviar mensagens nos canais de texto onde os comandos serão usados.

---

## 🎮 Comandos do Whistle

O Whistle usa comandos em barra (`/`) para facilitar a sua vida!

- **`/play <música>`**: Toca uma música ou adiciona-a à fila de reprodução.
  - Exemplo: `/play Never Gonna Give You Up`
  - Exemplo: `/play https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - Exemplo: `/play https://open.spotify.com/track/4cphfR7D6X0YgN6VzQ4jJ0`
- **`/ping`**: Responde com pong, mostrando se ele está online e responsivo.

---

## 🛠️ Instalação e Execução (Para Desenvolvedores)

Se você deseja rodar sua própria instância do Whistle ou contribuir com o projeto:

### Pré-requisitos

- Node.js v16.x ou superior
- npm (gerenciador de pacotes do Node.js)
- Conta de Desenvolvedor no Discord (para criar um aplicativo bot e obter um Token)
- Conta de Desenvolvedor no Spotify (para obter Client ID e Client Secret)

### ⚙️ Configuração

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/c4uan/whistle-bot](https://github.com/c4uan/whistle-bot)
    cd whistle-bot
    ```

2.  **Instale as dependências:**
    _(Lembre-se da nossa jornada! Se tiver problemas com `play-dl`, tente os comandos de instalação do GitHub que discutimos.)_

    ```bash
    npm install
    # Se o npm install falhar para play-dl, use:
    # npm install "github:distubejs/play-dl#https"
    ```

3.  **Crie um arquivo `.env`:**
    Crie um arquivo chamado `.env` na raiz do projeto com suas credenciais:

    ```env
    DISCORD_TOKEN=SEU_TOKEN_DO_BOT_DO_DISCORD
    CLIENT_ID=SEU_ID_DO_APLICATIVO_DISCORD

    SPOTIFY_CLIENT_ID=SEU_CLIENT_ID_DO_SPOTIFY
    SPOTIFY_CLIENT_SECRET=SEU_CLIENT_SECRET_DO_SPOTIFY
    ```

    - Obtenha seu `DISCORD_TOKEN` e `CLIENT_ID` no [Discord Developer Portal](https://discord.com/developers/applications).
    - Obtenha seu `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET` no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

4.  **Registre os Comandos:**
    Você precisa dizer ao Discord quais comandos seu bot tem:

    ```bash
    node deploy-commands.js
    ```

5.  **Inicie o Bot:**
    ```bash
    node index.js
    ```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver ideias, relatar bugs ou quiser adicionar novos recursos, sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

## 📝 Licença

Este projeto está licenciado sob a Licença ISC.

---

<div align="center">
  <p>Feito com ❤️ por Cauan </p>
</div>
