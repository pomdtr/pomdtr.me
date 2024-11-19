# Telegram Echo Bot

In this guide, we'll build a simple Telegram bot that will saves messages sent to it and echoes them back to the sender.

The telegram API is documented [here](https://core.telegram.org/bots/api).

## Create a new bot

To create a new bot, you will need to talk to the [BotFather](https://t.me/botfather) on Telegram.

1. Open Telegram and search for `@botfather`.
2. Send `/newbot` command to the BotFather.
3. Follow the instructions to create a new bot.
4. Once you have created the bot, the BotFather will give you a token. Save this token as you will need it later

## Setup the webhook

```sh
export BOT_TOKEN=<your-bot-token>
export SECRET_TOKEN=<random-secret-token>
export WEBHOOK_URL=https://telegram-echo-bot.<your-domain>
curl -X POST https://api.telegram.org/bot$BOT_TOKEN/setWebhook -d "url=$WEBHOOK_URL" -d "secret_token=$SECRET_TOKEN"
```

You're all set! Now you can send messages to your bot and it will echo them back to you.
