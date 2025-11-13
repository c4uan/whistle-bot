require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

// --- CARREGADOR DE COMANDOS ---
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// --- CARREGADOR DE EVENTOS (NOVO) ---
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// --- FIM DO CARREGADOR DE EVENTOS ---

// Inicializando DisTube
client.distube = new DisTube(client, {
  plugins: [
    new SpotifyPlugin({
      api: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      },
    }),
    new SoundCloudPlugin(),
  ],
  joinNewVoiceChannel: true,
});

// Eventos do DisTube
client.distube
  .on('playSong', (queue, song) => {
    const channel = queue.textChannel;
    if (!channel?.send) return;
    const embed = {
      color: 0x00ff00,
      title: '🎶 Tocando agora',
      description: `**[${song.name}](${song.url})**`,
      thumbnail: { url: song.thumbnail },
      fields: [
        { name: 'Duração', value: song.formattedDuration, inline: true },
        { name: 'Solicitado por', value: song.user.tag, inline: true },
        {
          name: 'Posição na fila',
          value: `${queue.songs.indexOf(song) + 1}`,
          inline: true,
        },
      ],
      footer: { text: `Fila: ${queue.songs.length} músicas` },
    };
    channel.send({ embeds: [embed] }).catch(() => {});
  })
  .on('addSong', (queue, song) => {
    const channel = queue.textChannel;
    if (!channel?.send) return;
    const embed = {
      color: 0xffff00,
      title: '✅ Adicionado à fila',
      description: `**[${song.name}](${song.url})**`,
      thumbnail: { url: song.thumbnail },
      fields: [
        { name: 'Duração', value: song.formattedDuration, inline: true },
        { name: 'Solicitado por', value: song.user.tag, inline: true },
      ],
      footer: { text: `Fila: ${queue.songs.length} músicas` },
    };
    channel.send({ embeds: [embed] }).catch(() => {});
  })
  .on('error', (error, queue) => {
    console.error('Distube Error:', error);
    if (queue?.textChannel?.send) {
      queue.textChannel.send(
        `❌ Ocorreu um erro: ${error.message.slice(0, 1900)}`
      );
    }
  })
  .on('finish', (queue) => {
    const channel = queue.textChannel;
    if (channel?.send) channel.send('✅ Fim da fila!');
  });

client.login(process.env.DISCORD_TOKEN);
