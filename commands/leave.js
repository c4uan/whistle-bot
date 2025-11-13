const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Faz o bot sair do canal de voz e limpa a fila.'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);
    const userVoiceChannel = interaction.member?.voice?.channel;

    // Pega a conexão de voz do DisTube neste servidor
    const botVoiceConnection = client.distube.voices.get(interaction.guildId);

    // 1. O bot não está em um canal de voz
    if (!botVoiceConnection) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Eu não estou em nenhum canal de voz!'),
        ],
        ephemeral: true,
      });
    }

    // 2. O usuário não está em um canal de voz
    if (!userVoiceChannel) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription(
              '❌ Você precisa estar em um canal de voz para me remover!'
            ),
        ],
        ephemeral: true,
      });
    }

    // 3. O usuário não está no mesmo canal que o bot
    if (userVoiceChannel.id !== botVoiceConnection.channel.id) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription(
              '❌ Você precisa estar no **mesmo** canal de voz que eu!'
            ),
        ],
        ephemeral: true,
      });
    }

    // Se tudo estiver OK, saia
    try {
      // Se uma fila existir, pare-a (isso também limpa a fila)
      if (queue) {
        await queue.stop();
      }

      // Comando explícito para o DisTube sair do canal
      await client.distube.voices.leave(interaction.guild);

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setDescription('👋 Saí do canal de voz!'),
        ],
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('❌ Ocorreu um erro ao tentar sair do canal.'),
        ],
        ephemeral: true,
      });
    }
  },
};
