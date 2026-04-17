const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: 25565,
    username: process.env.MC_USER,
    version: false
  })

  bot.on('login', () => console.log('✅ Logged in'))

  bot.on('spawn', () => {
    console.log('🌍 Spawned')

    setInterval(() => {
      if (!bot.entity) return

      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)

      bot.look(Math.random() * Math.PI * 2, 0, true)

      console.log('🔁 AFK move')
    }, 60000)
  })

  bot.on('end', () => {
    console.log('❌ Disconnected, retry in 15s')
    setTimeout(startBot, 15000)
  })

  bot.on('kicked', r => console.log('⚠️ Kicked:', r))
  bot.on('error', e => console.log('⚠️ Error:', e.message))
}

startBot()
