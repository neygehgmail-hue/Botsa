const mineflayer = require('mineflayer')

const config = {
  host: process.env.MC_HOST,
  port: 25565,
  username: process.env.MC_USER,
  version: false
}

let bot
let afkInterval = null

function createBot() {
  console.log('🚀 Starting bot...')

  bot = mineflayer.createBot(config)

  bot.once('login', () => {
    console.log('✅ Logged in')
  })

  bot.once('spawn', () => {
    console.log('🌍 Spawned')

    // VERY IMPORTANT: wait before doing anything
    setTimeout(() => {
      startAFK()
    }, 10000) // 10 sec delay (prevents invalid movement)
  })

  bot.on('end', () => {
    console.log('❌ Disconnected. Reconnecting in 30s...')
    cleanup()

    setTimeout(() => {
      createBot()
    }, 30000)
  })

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })
}

function startAFK() {
  if (!bot.entity) return

  console.log('🟢 Ultra-safe AFK mode started')

  afkInterval = setInterval(() => {
    if (!bot.entity) return

    safeLook()
  }, randomTime(90000, 180000)) // 1.5–3 minutes
}

function safeLook() {
  try {
    const yaw = bot.entity.yaw + (Math.random() - 0.5) * 0.2
    const pitch = (Math.random() - 0.5) * 0.1

    bot.look(yaw, pitch, true)

    console.log('👀 Slight camera movement')
  } catch (e) {
    console.log('⚠️ Look error:', e.message)
  }
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function cleanup() {
  if (afkInterval) {
    clearInterval(afkInterval)
    afkInterval = null
  }
}

createBot()    if (!bot.entity) return

    // Pick a random action (NOT all at once)
    const action = Math.floor(Math.random() * 3)

    switch (action) {
      case 0:
        doLook()
        break
      case 1:
        doStep()
        break
      case 2:
        doSneak()
        break
    }

  }, randomTime(60000, 120000)) // 1–2 minutes between actions
}

function doLook() {
  const yaw = bot.entity.yaw + (Math.random() - 0.5) * 0.6
  const pitch = (Math.random() - 0.5) * 0.3

  bot.look(yaw, pitch, true)
  console.log('👀 Look around')
}

function doStep() {
  bot.setControlState('forward', true)

  setTimeout(() => {
    bot.setControlState('forward', false)
    console.log('🚶 Small step')
  }, randomTime(1000, 2000))
}

function doSneak() {
  bot.setControlState('sneak', true)

  setTimeout(() => {
    bot.setControlState('sneak', false)
    console.log('🕶️ Sneak toggle')
  }, randomTime(2000, 4000))
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function cleanup() {
  if (afkInterval) {
    clearInterval(afkInterval)
    afkInterval = null
  }
}

createBot()
