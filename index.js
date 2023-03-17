const { Telegraf, session, Scenes } = require('telegraf')

require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN)


const simpleScene = new Scenes.BaseScene('simple-id')



const wizard = new Scenes.WizardScene('wizard',
    ctx => {
        ctx.reply('Step 1')
        ctx.wizard.cursor++
        ctx.wizard.cursor++
    },
    ctx=>{
        ctx.reply('Step 2')
        ctx.wizard.next()
    },
    ctx=> {
        ctx.reply("Step 3")
        ctx.wizard.back()
    }
)



simpleScene.enter(ctx => {
    ctx.reply("Ismingizni kiriting: ")
})

simpleScene.leave(ctx => {
    ctx.reply(`Ismingizni saqlandi: ${ctx.session.name}`)
})

// simpleScene.on('text', ctx=>{
//     ctx.session.name = ctx.message.text
//     ctx.scene.leave()
// })

simpleScene.command('test', ctx => {
    ctx.reply('Inside scene')
    ctx.session.name = 'test'
    ctx.scene.leave()
})


simpleScene.command('t', ctx => {
    ctx.reply('Inside scene')
})

const stage = new Scenes.Stage([simpleScene,wizard])

bot.use(session())
bot.use(stage.middleware())
bot.use(async (ctx, next) => {
    if (ctx.session === undefined) ctx.session = {}
    await next()
})

bot.start(ctx => {
    ctx.reply("Salom")
    ctx.session.state = "start"
})

bot.command('test', ctx => {
    ctx.reply(`${ctx.session.state}`)
})

bot.command("enter", ctx => ctx.scene.enter('wizard'))

bot.launch()