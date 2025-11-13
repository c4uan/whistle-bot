require('dotenv').config();
const play = require('play-dl');

(async () => {
  try {
    await play.setToken({
      spotify: {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      },
    });

    console.log('Autenticação Spotify OK ✅');

    const track = await play.spotify(
      'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC'
    ); // exemplo
    console.log('Track carregada:', track.name);
  } catch (err) {
    console.error('Erro no teste:', err);
  }
})();
