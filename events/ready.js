const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true, // Este evento só roda uma vez
  execute(client) {
    console.log(`✅ Pronto! Logado como ${client.user.tag}`);
    // Você pode definir o status do bot aqui:
    client.user.setActivity('Músicas no Spotify', { type: 'LISTENING' });
  },
};
