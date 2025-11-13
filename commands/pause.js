const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { execute } = require('./play');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausa a música que está tocando.'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
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

    if (queue.paused) {
      queue.resume();
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setDescription('▶️ A música foi retomada!'),
        ],
        ephemeral: true,
      });
    }

    try {
      queue.pause();
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Yellow')
            .setDescription('⏸️ A música foi pausada!'),
        ],
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Ocorreu um erro ao tentar pausar.'),
        ],
        ephemeral: true,
      });
    }
  },
};
