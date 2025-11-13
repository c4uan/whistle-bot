const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Toca uma música do YouTube ou Spotify')
    .addStringOption((option) =>
      option
        .setName('musica')
        .setDescription('Nome ou link da música/playlist')
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const query = interaction.options.getString('musica');
    const voiceChannel = interaction.member?.voice?.channel;

    if (!voiceChannel) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Você precisa estar em um canal de voz!'),
        ],
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    let textChannel = interaction.channel;
    if (!textChannel?.send) {
      if (interaction.guild) {
        textChannel = interaction.guild.channels.cache
          .filter(
            (ch) =>
              ch.isTextBased() &&
              ch
                .permissionsFor(interaction.guild.members.me)
                .has('SendMessages')
          )
          .first();
      }
    }

    if (!textChannel?.send) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Não encontrei um canal de texto válido.'),
        ],
      });
    }

    try {
      // Verificação de query válida
      if (!query || query.trim().length === 0)
        throw new Error('Query inválida');

      await client.distube.play(voiceChannel, query, {
        member: interaction.member,
        textChannel,
      });

      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor('Blue')
            .setDescription(`🔎 Buscando: **${query}**...`),
        ],
      });
    } catch (err) {
      console.error(err);

      // Tratamento detalhado de erros
      let description = '❌ Ocorreu um erro ao tentar tocar a música.';

      if (err.message?.includes('Cannot get token from scraping'))
        description = '⚠️ Spotify: não é possível buscar mais de 100 faixas.';
      else if (err.message?.includes('No valid results'))
        description = '❌ Música ou playlist não encontrada.';
      else if (err.errorCode === 'NO_EXTRACTOR_PLUGIN')
        description =
          '❌ Nenhum plugin de extração disponível para essa pesquisa. Use um link do YouTube ou Spotify.';

      await interaction.editReply({
        embeds: [
          new EmbedBuilder().setColor('Red').setDescription(description),
        ],
      });
    }
  },
};
