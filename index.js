async function main() {
  const { Telegraf } = require("telegraf");
  const { getDetails } = require("./api");
  const { sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    try {
      ctx.reply(`Hi ${ctx.message.from.first_name},\n\nI can Download Files from TB by @Iam_zeer0\n\n.`);
    } catch (e) {
      console.error(e);
    }
  });

  bot.on("message", async (ctx) => {
    if (ctx.message && ctx.message.text) {
      const messageText = ctx.message.text;
      if (
        messageText.includes("terabox.com") ||
        messageText.includes("teraboxapp.com")||
        messageText.includes("1024tera.com")
      ) {
        const details = await getDetails(messageText);
        if (details && details.direct_link) {
          try {
            ctx.reply(`Sending Files. Please Wait.!`);
            sendFile(details.direct_link, ctx);
          } catch (e) {
            console.error(e); // Log the error for debugging
          }
        } else {
          ctx.reply('Something went wrong 🙃');
        }
        console.log(details);
      } else {
        ctx.reply("Please send a valid Terabox link.");
      }
    }
  });

  const app = express();
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
