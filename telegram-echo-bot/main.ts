import type { Update } from "npm:@grammyjs/types";
import { JSONFilePreset } from "npm:lowdb@7.0.1/node";

const botToken = Deno.env.get("BOT_TOKEN");
if (!botToken) {
    throw new Error("BOT_TOKEN is required");
}

const secretToken = Deno.env.get("SECRET_TOKEN");
if (!secretToken) {
    throw new Error("SECRET_TOKEN is required");
}

const apiURL = `https://api.telegram.org/bot${botToken}`;

const db = await JSONFilePreset(
    "messages.json",
    { messages: [] } as { messages: string[] },
);

const handler = async (req: Request) => {
    if (req.method === "GET") {
        return Response.json(db.data);
    }

    const secret = req.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (secret !== secretToken) {
        return new Response("Unauthorized", { status: 401 });
    }

    const update: Update = await req.json();
    const text = update.message?.text;
    if (!text) {
        return new Response("OK");
    }

    await db.update(({ messages }) => {
        messages.push(text);
    });

    await fetch(`${apiURL}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: update.message?.chat.id,
            text: update.message?.text,
        }),
    });

    return new Response("OK");
};

export default {
    fetch: handler,
};
