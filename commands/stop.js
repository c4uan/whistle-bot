const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Para a música, limpa a fila e desconecta o bot.'),

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

    if (!queue) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Não há nenhuma música na fila!'),
        ],
        ephemeral: true,
      });
    }

    try {
      await queue.stop();
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('⏹️ A fila foi encerrada.'),
        ],
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Ocorreu um erro ao tentar parar a fila.'),
        ],
        ephemeral: true,
      });
    }
  },
};
