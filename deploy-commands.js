require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Instancia o REST
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Função assíncrona para registrar os comandos

(async () => {
  try {
    console.log(`Registrando ${commands.length} slash commands...`);

    //Método 'put' atualiza todos os comandos
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(`✅ Sucesso! ${data.length} comandos registrados globalmente.`);
  } catch (error) {
    
    console.error('Erro ao registrar comandos:', error);
  }
})();
