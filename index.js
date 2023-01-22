const { Telegraf } = require('telegraf')

require('dotenv').config()

const { RateLimiter } = require('@riddea/telegraf-rate-limiter')
const bot = new Telegraf(process.env.TOKEN)

const rateLimiter = new RateLimiter(1, 2000);

const rate = async (ctx, next) => {
    const limited = await rateLimiter.take(ctx.from.id);
    if (limited) return await ctx.reply("Hey! Wait 2 second before send new message!");
    else next()
}

bot.use(async (ctx, next) => {
    const time = new Date().getTime()
    await next()
    console.log(new Date().getTime() - time)
})

const onlyAdmin = async (ctx, next) => {
    if( ctx.from.id === 12920798){
        await next()
    }
}

bot.start(rate, async (ctx) => {
    
    ctx.sendMessage("Assalomu alaykum, men sizni habarlaringizni qayta yuboraman!")
})

bot.hears(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, async (ctx) => {
    console.log(ctx.message.text)
})

bot.command('test', async(ctx) => {
    ctx.sendMessage("Test command is working")
})

bot.launch()