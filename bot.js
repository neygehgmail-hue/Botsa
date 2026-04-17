const mineflayer = require('mineflayer');

const config = {
  host: process.env.MC_HOST,
  port: 25565,
  username: process.env.MC_USER,
  version: false
};

let bot;
let afkInterval = null;

function createBot() {
  console.log('🚀 Starting bot...');

  bot = mineflayer.createBot(config);

  bot.once('login', () => {
    console.log('✅ Logged in');
  });

  bot.once('spawn', () => {
    console.log('🌍 Spawned');

    setTimeout(() => {
      startAFK();
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected. Reconnecting in 30s...');
    cleanup();

    setTimeout(() => {
      createBot();
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message);
  });
}

function startAFK() {
  if (!bot || !bot.entity) return;

  console.log('🟢 AFK mode started');

  afkInterval = setInterval(() => {
    if (!bot || !bot.entity) return;

    try {
      const yaw = bot.entity.yaw + (Math.random() - 0.5) * 0.2;
      const pitch = (Math.random() - 0.5) * 0.1;

      bot.look(yaw, pitch, true);
      console.log('👀 Slight movement');
    } catch (e) {
      console.log('⚠️ Look error:', e.message);
    }

  }, randomTime(90000, 180000));
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function cleanup() {
  if (afkInterval) {
    clearInterval(afkInterval);
    afkInterval = null;
  }
}

createBot();
