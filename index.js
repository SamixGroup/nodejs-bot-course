const { Telegraf } = require('telegraf')


const token = ""


const bot = new Telegraf(token)


bot.start(async (ctx) => {
    ctx.sendMessage("Assalomu alaykum, men sizni habarlaringizni qayta yuboraman!")
})

bot.on('text', async (ctx) => {
    ctx.sendMessage(ctx.message.text)
})

bot.launch()