require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
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

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// Inicializando DisTube
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: true,
  plugins: [new SpotifyPlugin(), new YtDlpPlugin()],
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
      title: '➕ Adicionado à fila',
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
  .on('error', (channel, error) => {
    console.error('Distube Error:', error);
    if (channel?.send) channel.send(`❌ Ocorreu um erro: ${error.message}`);
  })
  .on('finish', (queue) => {
    const channel = queue.textChannel;
    if (channel?.send) channel.send('✅ Fim da fila!');
  });

// Eventos de interação
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.editReply({ content: '❌ Erro ao executar comando!' });
    } else {
      await interaction.reply({
        content: '❌ Erro ao executar comando!',
        ephemeral: true,
      });
    }
  }
});

client.once('ready', () => {
  console.log(`${client.user.tag} está online!`);
});

client.login(process.env.TOKEN);
