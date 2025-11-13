const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Ignora se não for um Slash command
    if (!interaction.isChatInputCommand()) return;
    // Pega o comando da coleção do index.js
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Comandonão encontrado: ${interaction.commandName}`);
      return;
    }
    try {
      //Executa o comando
      await command.execute(interaction);
    } catch (error) {
      console.error('Erro ao executar comando:', error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'Ocorreu um erro ao executar este comando!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'Ocorreu um erro ao executar este comando!',
          ephemeral: true,
        });
      }
    }
  },
};
