const { Client } = require('discord.js')
require('dotenv').config({
  path: '.env'
})

const client = new Client({ 
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES'
  ]
})

client.on('raw', async (packet) => {
  if (packet.t === 'MESSAGE_REACTION_ADD') {
    if (packet.d.emoji.name === '🖕') {
      const message = await client.channels.cache.get(packet.d.channel_id).messages.fetch(packet.d.message_id)

      message.reactions.cache.filter(reaction => reaction.emoji.name === '🖕')
        .forEach((reaction) => reaction.remove())
    }
  }
})

client.login(process.env.TOKEN)
