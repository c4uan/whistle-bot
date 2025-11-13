const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com pong'),

  async execute(interaction) {
    const latencia = Date.now() - interaction.createdTimestamp;

    await interaction.reply(`🏓 Pong!`);
  },
};
