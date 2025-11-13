const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Pula para a próxima música da fila.'),

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
      if (queue.songs.length === 1) {
        // Se só houver uma música, 'skip' funciona como 'stop'
        queue.stop();
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Green')
              .setDescription('⏭️ Música pulada! Não há mais músicas na fila.'),
          ],
        });
      } else {
        await queue.skip();
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Green')
              .setDescription('⏭️ Música pulada!'),
          ],
        });
      }
    } catch (err) {
      console.error(err);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Ocorreu um erro ao tentar pular a música.'),
        ],
        ephemeral: true,
      });
    }
  },
};
